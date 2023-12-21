export const suggest = async (
  path: [[string, string], ...[string, string][]],
  rightNode: string,
  nodes: {[key: string]: {value?: {description: string}, content: [string, string][]}},
  updateNodes: (nodes: {[key: string]: {value?: {description: string}, content: [string, string][]}}) => void,
  ) => {
  const [root, ...pathWithoutRoot] = path
  const token = localStorage.getItem('token')

  const rightNodeObj = nodes[rightNode]

  if (!rightNodeObj) {
    throw new Error(`no right node for ${rightNode}`)
  }

  const hasDescription = rightNodeObj.content.filter((edge: [string, string]) => edge[0] === "{description}").length > 0

  const descriptions = pathWithoutRoot.map((edge: [string, string]) => {
    if (!hasDescription) {
      throw new Error(`no description for ${rightNode}`)
    }
    const description = rightNodeObj.value?.description
    if (!description) {
      
      throw new Error(`no description value for ${rightNode}`)
    }
    return description
  })
    
  const [mainTask, ...contextTasks] = descriptions.slice().reverse()

  const systemPrompt = `You are part of a group of workers build a tree of subtasks to describe a project, which may be big or small.  As such, you do not provide information that is not directly related to the subtask at hand because it will probably be provided by another worker`

  const promptIntro = `PLEASE OUTPUT SINGLE VALID JSON ARRAY OF STRINGS < 50 CHARS PER ENTRY.  `

  const promptBody = `Please create 3-7 subtasks of the following task: ${mainTask}.  For context, this is a subtask of ${contextTasks.join(' subtask of the task ')}.  Please do not provide subtasks which are likely included in other branches.  If necessary, group information into a single subtask`

  const promptConclusion = `Please output only single json array containing only strings.`

  const userPrompt = `${promptIntro} ${promptBody} ${promptConclusion}`
  


  console.log("PROMPT", userPrompt, systemPrompt)

  const parentRight = path[path.length - 1]?.[1]
  if(!parentRight) {
    throw new Error(`no parent right for ${path}`)
  }

  const parentNode = nodes[parentRight!]
  if(!parentNode) {
    throw new Error(`no parent node for ${parentRight}`)
  }
  
  const response: any = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo-1106',
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      max_tokens: 300
    })
  })

  if(!response.ok) {
    const result = await response.json()
    console.log('result', result, result.error.message)
    return {
      error: true,
      message: result.error.message 
    }
  }
  
  const messages = await response.json().then((json: any) => {
    return json.choices.map( (choice: {message: {content: string }}) => choice.message.content) 
  }).catch((error: Error) => {
    console.log('error', error)
  })

  console.log('messages', messages)
  const taskSets = messages.map((message: string) => {
    const messageMatch = message.match(/.*(\[[^\]\[]*\]).*/m)
    if (!messageMatch || !messageMatch[1]) {
      throw new Error(`Could not parse response: ${message}`)
    }
    return JSON.parse(messageMatch[1])
  })

  if (taskSets.length === 0) {
    console.log('messages', messages)
    throw new Error(`No task sets found`)
  }
  
  if (taskSets.length > 1) {
    console.warn(`More than one task set found`, messages)
  }

  const newTasks = taskSets[0]

  const newNodeItems = newTasks.map((task: string) => {
    const newId = task
    const newNode = {
    value: {
      description: task,
    },
    content: [["{description}", "{description}"]],
    }
    return [newId, newNode]
  })

  const parentDescriptionEdge = parentNode.content.filter((edge: [string, string]) => edge[0] === "{description}") || []

  const newNodesObj = newNodeItems.reduce((acc: any, [newId, newNode]: [string, any]) => {
    return {...acc, [newId]: newNode}
  }, {
    ...nodes,
    [parentRight]: {
      ...parentNode,
      content: [...parentDescriptionEdge, ...newNodeItems.map(([newId, newNode]: [string, any]) => ["{checklist}", newId])]
    }
  })

  updateNodes(newNodesObj)
}