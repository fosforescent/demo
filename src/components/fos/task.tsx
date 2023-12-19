import React, { useState } from 'react'

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { cornersOfRectangle } from '@dnd-kit/core/dist/utilities/algorithms/helpers'




export const TaskRow = ({
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

  console.log('value', rightNode)
  const value = rightNode.value

  

  const [textState, setTextState] = useState(rightNode.value.description)

  const checkBox = () => {
    const oldValue = value
    const newValue = { ...value, status: value.status === 0 ? 1 : 0 }

    console.log('checkBox', value, !value.status, rightNode, newValue)
    console.log('newNode', { ...rightNode, value: newValue })
    updateRow(leftNode, { ...rightNode, value: newValue })
  }

  const changeText = (e: any ) => {
    console.log('changeText', e.target.value)
    setTextState(e.target.value)
  }

  const saveText = (e: any ) => {
    updateRow(leftNode, { ...rightNode, value: { ...value, description: textState } })
  }

  console.log('value', value, textState)

  return (<div className='flex justify-center'><Checkbox checked={value.status === 1} style={{padding: '10px'}} onClick={checkBox} /><Input type="text" placeholder="" onChange={changeText} value={textState} onBlur={saveText} /></div>)

}