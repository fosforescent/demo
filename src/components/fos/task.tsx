import React, { useState } from 'react'

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

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

  if (!matchesRight || !matchesRight[1]){
    // value should be gotten from valueobj
    return <CompositeTaskRow leftNode={leftNode} rightNode={rightNode} updateNodes={updateNodes} nodes={nodes} />
  }


  
  const rightNodeObj = nodes[rightNode]
  const leftNodeObj = nodes[leftNode]
  
  if (!rightNodeObj || !leftNodeObj) {
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


const CompositeTaskRow = ({
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


  console.log('value asdfsdf', rightNode, nodes[rightNode])

  const checkBox = () => {
   
    console.log("thes")
  }

  const changeText = (e: any ) => {
    console.log('changeText', e.target.value)
  }

  const saveText = (e: any ) => {
    console.log('saveText', e.target.value)
  }



  return (<div className='flex justify-center'><Checkbox checked={false} style={{padding: '10px'}} onClick={checkBox} /><Input type="text" placeholder="" onChange={changeText} value={"test1"} onBlur={saveText} /></div>)

}