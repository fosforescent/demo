import React, { useState } from 'react'


import { TrashIcon, PlayIcon, Folder } from "lucide-react"
import { QuestionMarkCircledIcon, ComponentNoneIcon } from "@radix-ui/react-icons"


import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "../ui/button"


export const NameView = ({
    value,
    updateValue
  }: {
    value: string
    updateValue: (value: string) => void
}) => {


  return (<Input type="text" placeholder="" onChange={(e) => updateValue(e.target.value)} value={value} />)
}

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
  const [[parentLeft, parentRight], ...rest] = path
  const parentValue = nodes[parentRight]?.value

  if (!parentValue) {
    throw new Error(`no parent value for ${parentRight} --- ${parentValue}... shouldn't have gotten here `)
  }

  const valueKey = matchesRight[1]
  console.log('value', rightNode)
  const value = parentValue[valueKey]



 
  const [textState, setTextState] = useState(value.description)


  const changeText = (e: any ) => {
    console.log('changeText', e.target.value)
    setTextState(e.target.value)
  }

  const saveText = (e: any ) => {
    updateNodes({...nodes, [parentRight]:  {...parentValue, value: { ...value, description: textState } } })
  }

  console.log('value', value, textState)

  return (<div className='flex justify-center'><Input type="text" placeholder="" onChange={changeText} value={textState} onBlur={saveText} /></div>)

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

  console.log('value', rightNode)
  const value = nodes[rightNode]?.value

  if (matchesRight){
    throw new Error(`right node for task should be composite with properties "{description}" and "{checklist}": ${rightNode}`)
  }
  
  const rightNodeObj = nodes[rightNode]
  
  if (!rightNodeObj ) {
    throw new Error(`no node for ${rightNode}... shouldn't have gotten here`)
  }


  const [textState, setTextState] = useState(rightNodeObj.value.description)


  const changeText = (e: any ) => {
    console.log('changeText', e.target.value)
    setTextState(e.target.value)
  }

  const saveText = (e: any ) => {
    updateNodes({...nodes, [rightNode]:  {...rightNodeObj, value: { ...value, description: textState } } })
  }

  console.log('value', value, textState)

  return (<div className='flex justify-center'><Input type="text" placeholder="" onChange={changeText} value={textState} onBlur={saveText} /></div>)

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

  console.log('value', rightNode)
  const value = nodes[rightNode]?.value

  if (matchesRight){
    throw new Error(`right node for task should be composite with properties "{description}" and "{checklist}": ${rightNode}`)
  }
  
  const rightNodeObj = nodes[rightNode]
  
  if (!rightNodeObj ) {
    throw new Error(`no node for ${rightNode}... shouldn't have gotten here`)
  }


  const [textState, setTextState] = useState(rightNodeObj.value.description)

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
  }

  const saveText = (e: any ) => {
    updateNodes({...nodes, [rightNode]:  {...rightNodeObj, value: { ...value, description: textState } } })
  }

  console.log('value', value, textState)

  return (<div className='flex justify-center'><Checkbox checked={value.status === 1} style={{padding: '10px'}} onClick={checkBox} /><Input type="text" placeholder="" onChange={changeText} value={textState} onBlur={saveText} /></div>)

}






export const FolderRowMenu = ({ 
  valueNode,
  nodes
}: {
  valueNode: string ,
  nodes: {[key: string]: { value?: any, content: [string, string][]}}
}) => {

  return (<div className='flex w-60 justify-around'>
    <Button variant={"secondary"} className='bg-emerald-900'><QuestionMarkCircledIcon /></Button>
    <Button variant={"secondary"} className='bg-emerald-900'><PlayIcon /></Button>
    <Button variant={"destructive"}><TrashIcon /></Button>
    <Button variant={"destructive"}><ComponentNoneIcon /></Button>
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
    <div style={{padding: '10px 10px 10px 0', position: 'relative', fontSize: '.7rem'}}><Folder style={{position: 'absolute', top: 5, left: -10, width: '25px', height: '25px' }} />{numItems}</div>
    <Input type="text" placeholder="" onChange={(e) => updateValue(e.target.value)} value={name} />
  </div>)
}

export const CoreFolderRow = ({
  leftNode, 
  rightNode,
  updateRow,
  nodes
}: {
  leftNode: {value?: any, content: [string, string][] },
  rightNode: {value?: any, content: [string, string][] },
  updateRow: (leftValue: {value?: any, content: [string, string][]}, rightValue: {value?: any, content: [string, string][]}) => void
  nodes: {[key: string]: { value?: any, content: [string, string][]}}
}) => {

  const updateValue = (newVal: string) => {
    console.log('thest1')
  }

  // console.log('valueNode', rightNode)

  const nameNodeId = rightNode.content.find((item) => item[0] === 'name')?.[1]

  if(!nameNodeId) return (<div>error - no name provided</div>)

  const contentNodeId = rightNode.content.find((item) => item[0] === 'content')?.[1] 

  if(!contentNodeId) return (<div>error - no content provided</div>)

  const name = nodes[nameNodeId]?.value

  const numItems = rightNode.content.length

  return (<div className="flex">
    <div style={{padding: '10px 10px 10px 0', position: 'relative', fontSize: '.7rem'}}><Folder style={{position: 'absolute', top: 5, left: -10, width: '25px', height: '25px' }} />{numItems}</div>
    <div>{name}</div>
  </div>)
}






const NameRow = ({
  left,
  right,
  dragging, 
  nodes,
  updateNodes,
  appendToPath,
  value,
  updatePath,
} : {
  left: string,
  right: string,
  dragging: string | null,
  nodes: {[key: string]: { value?: any, content: [string, string][]}}
  updateNodes: (nodes: any) => void
  appendToPath: (left: string, right: string) => void
  value: any,
  updatePath: (path: [[string, string], ...[string, string][]]) => void
}) => {

  const rightMatches = right.match(/^[\{](\w+)[\}]$/);

  if (rightMatches && rightMatches[1]) {
    const rowValue = value[rightMatches[1]]

    return (<div><Input value={rowValue} /></div>)

  } else {
    return (<div> More complicated than that </div>)

  }


  
}



