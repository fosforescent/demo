import React, { useEffect, useState } from 'react'


import { TrashIcon, PlayIcon, Folder } from "lucide-react"
import { QuestionMarkCircledIcon, ComponentNoneIcon } from "@radix-ui/react-icons"


import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "../ui/button"



export const StringRow = ({
  leftNode, 
  rightNode,
  updateNodes,
  nodes,
  path
}: {
  leftNode: string,
  rightNode: string,
  updateNodes: ( newNodes: {[key: string]: { value?: any, content: [string, string][]}}) => void
  nodes: {[key: string]: { value?: any, content: [string, string][]}},
  path: [[string, string], ...[string, string][]]
}) => {


  const matchesRight = rightNode.match(/^[\{](\w+)[\}]$/)


  if (!matchesRight || !matchesRight[1]){
    throw new Error(`right node for task should be reference to value object "{description}": ${rightNode}`)
  }
  const [[parentLeft, parentRight], ...rest] = path.slice().reverse() as [[string, string], ...[string, string][]]
  const parentNode = nodes[parentRight]
  const parentValue = parentNode?.value

  if (!parentValue) {
    console.log('path', path, leftNode, rightNode, parentLeft, parentRight, path.slice().reverse() )
    throw new Error(`no parent value for ${parentRight} --- ${parentValue}... shouldn't have gotten here `)
  }

  const valueKey = matchesRight[1]
  const value = parentValue[valueKey]

  const [textState, setTextState] = useState(value);
  
  useEffect(() => {
    setTextState(value);
  }, [value]);

  // console.log('value', rightNode, valueKey, value, parentValue, textState)
  // console.log('path', path, leftNode, rightNode, parentLeft, parentRight, path.slice().reverse() )


  const [timer, setTimer] = useState(0);
  useEffect(() => {
    let handler: any = null
    console.log('timer', timer)
    if (timer > 0) {
      handler = setTimeout(() => setTimer(timer + 1), 100)
    } 
    if (timer > 10) {
      console.log('saveText', textState)
      saveText(null)
      setTimer(0)
    }
    return () => clearTimeout(handler)
  }, [timer])
  
  const changeText = (e: any ) => {
    console.log('changeText', e.target.value)
    setTextState(e.target.value)
    setTimer(1)
  }

  const saveText = (e: any ) => {
    updateNodes({...nodes, [parentRight]:  {...parentNode, value: { [valueKey]: textState } } })
  }


  return (<div className='flex justify-center'><Input type="text" placeholder="" onChange={changeText} value={textState} onBlur={saveText} className="text-base" /></div>)

}



export const ChecklistRow = ({
  leftNode, 
  rightNode,
  updateNodes,
  nodes
}: {
  leftNode: string,
  rightNode: string,
  updateNodes: ( newNodes: {[key: string]: { value?: any, content: [string, string][]}}) => void
  nodes: {[key: string]: { value?: any, content: [string, string][]}}
}) => {


  const matchesRight = rightNode.match(/^[\{](\w+)[\}]$/)

  const value = nodes[rightNode]?.value

  if (matchesRight){
    throw new Error(`right node for task should be composite with properties "{description}" and "{checklist}": ${rightNode}`)
  }
  
  const rightNodeObj = nodes[rightNode]
  
  if (!rightNodeObj ) {
    throw new Error(`no node for ${rightNode}... shouldn't have gotten here`)
  }


  const [textState, setTextState] = useState(rightNodeObj.value.description)

  useEffect(() => {
    setTextState(rightNodeObj.value.description)
  }, [rightNodeObj])

  const changeText = (e: any ) => {
    setTextState(e.target.value)
  }

  const saveText = (e: any ) => {
    updateNodes({...nodes, [rightNode]:  {...rightNodeObj, value: { ...value, description: textState } } })
  }

 
  return (<div className='flex justify-center'><Input type="text" placeholder="" onChange={changeText} value={textState} onBlur={saveText} className="text-base" /></div>)

}


export const TaskRow = ({
  leftNode, 
  rightNode,
  updateNodes,
  nodes
}: {
  leftNode: string,
  rightNode: string,
  updateNodes: ( newNodes: {[key: string]: { value?: any, content: [string, string][]}}) => void
  nodes: {[key: string]: { value?: any, content: [string, string][]}}
}) => {


  const matchesRight = rightNode.match(/^[\{](\w+)[\}]$/)

  console.log('value [taskrow]', rightNode)
  const value = nodes[rightNode]?.value

  if (matchesRight){
    throw new Error(`right node for task should be composite with properties "{description}" and "{checklist}": ${rightNode}`)
  }
  
  const rightNodeObj = nodes[rightNode]
  
  if (!rightNodeObj ) {
    throw new Error(`no node for ${rightNode}... shouldn't have gotten here`)
  }


  const [textState, setTextState] = useState(rightNodeObj.value.description)

  const [timer, setTimer] = useState(0);
  useEffect(() => {
    let handler: any = null
    console.log('timer', timer)
    if (timer > 0) {
      handler = setTimeout(() => setTimer(timer + 1), 100)
    } 
    if (timer > 10) {
      console.log('saveText', textState)
      saveText(null)
      setTimer(0)
    }
    return () => clearTimeout(handler)
  }, [timer])

  const checkBox = () => {
    const oldValue = value
    const newValue = { ...value, status: value.status === 0 ? 1 : 0 }

    console.log('checkBox', value, !value.status, rightNode, newValue)
    console.log('newNode', { ...rightNodeObj, value: newValue })
    updateNodes({...nodes, [rightNode] : { ...rightNodeObj, value: newValue } })
  }

  const changeText = (e: any ) => {
    console.log('changeText', e.target.value)
    setTextState(e.target.value)
    setTimer(1)
  }

  const saveText = (e: any ) => {
    updateNodes({...nodes, [rightNode]:  {...rightNodeObj, value: { ...value, description: textState } } })
  }

  console.log('value [task row bottom]', value, textState)

  return (<div className='flex justify-center'><Checkbox checked={value.status === 1} style={{padding: '10px'}} onClick={checkBox} /><Input type="text" placeholder="" onChange={changeText} value={textState} onBlur={saveText} /></div>)

}






export const ChecklistRowMenu = ({ 
  leftNode,
  nodes,
  rightNode,
  updateNodes,
  path,
  // updatePath,
  setMenuOpen,
}: {
  leftNode: string,
  rightNode: string,
  path: [[string, string], ...[string, string][]],
  // updatePath: (path: [[string, string], ...[string, string][]]) => void
  nodes: {[key: string]: { value?: any, content: [string, string][]}}
  updateNodes: (nodes: {[key: string]: { value?: any, content: [string, string][]}}) => void
  setMenuOpen: (open: boolean) => void
}) => {

  const deleteNode = () => {
    const [parentLeft, parentRight] = path[path.length - 1] as [string, string]
    const parentNode = nodes[parentRight]
    if (!parentNode) {
      throw new Error(`no parent node for ${parentRight}... shouldn't have gotten here`)
    }
    const newContent = parentNode.content.filter((item) => item[0] !== leftNode || item[1] !== rightNode)
    updateNodes({...nodes, [parentRight]: {...parentNode, content: newContent } })
    setMenuOpen(false)
  }

  const snipNode = () => {

    const [parentLeft, parentRight] = path[path.length - 1] as [string, string]
    const parentNode = nodes[parentRight]
    const thisNode = nodes[rightNode]
    if (!parentNode) {
      throw new Error(`no parent node for ${parentRight}... shouldn't have gotten here`)
    }
    if (!thisNode) {
      throw new Error(`no this node for ${rightNode}... shouldn't have gotten here`)
    }
    const thisContent = thisNode.content
    const newContent = [
      ...parentNode.content.filter((item) => item[0] !== leftNode || item[1] !== rightNode),
      ...thisContent
    ]
    updateNodes({...nodes, [parentRight]: {...parentNode, content: newContent } })
    setMenuOpen(false)

  }



  return (<div className='flex w-60 justify-around'>
    {/* <Button variant={"secondary"} className='bg-emerald-900'><QuestionMarkCircledIcon /></Button> */}
    {/* <Button variant={"secondary"} className='bg-emerald-900'><PlayIcon /></Button> */}
    <Button variant={"destructive"} onClick={snipNode}><ComponentNoneIcon /></Button>
    <Button variant={"destructive"} onClick={deleteNode}><TrashIcon /></Button>
  </div>)
}


export const FolderRow = ({
  valueNodeId,
  nodes
}: {
  valueNodeId: string,
  nodes: {[key: string]: { value?: any, content: [string, string][]}}
}) => {

  const updateValue = (newVal: string) => {
    console.log('thest1')
  }

  const valueNode = nodes[valueNodeId]
  if(!valueNode){
    throw new Error('no value node')
  }

  console.log('valueNode', valueNode)

  const nameNodeId = valueNode.content.find((item) => item[0] === 'name')?.[1]

  if(!nameNodeId) return (<div>error - no name provided</div>)

  const contentNodeId = valueNode.content.find((item) => item[0] === 'content')?.[1] 

  if(!contentNodeId) return (<div>error - no content provided</div>)

  const name = nodes[nameNodeId]?.value

  const numItems = valueNode.content.length

  return (<div className="flex">
    <div style={{padding: '10px 10px 10px 0', position: 'relative'}}><Folder style={{position: 'absolute', top: 5, left: -10, width: '25px', height: '25px' }} />{numItems}</div>
    <Input type="text" placeholder="" onChange={(e) => updateValue(e.target.value)} value={name} className='text-base'  />
  </div>)
}

