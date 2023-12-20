'use client'

import React from 'react'
import { Crosshair1Icon, DiscIcon, QuestionMarkCircledIcon, PlayIcon, DragHandleDots2Icon, DotsVerticalIcon, ComponentNoneIcon, TrashIcon, PlusCircledIcon  } from '@radix-ui/react-icons'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


import { Input } from '@/components/ui/input'
import {
  NameView,
} from './rowComponents'

import {
  TaskRow
} from './task'


import {
  FolderRowMenu,
  FolderRow,
  CoreFolderRow
} from './folder'

import { Button } from "@/components/ui/button"

import { ZoomComponent, ChangeInstruction } from './rowMenu'

export function RowView({
  leftNode,
  rightNode,
  dragging,
  updateNodes,
  nodes,
  updatePath,
  path,
  value,
}: {
  leftNode: string,
  rightNode: string,
  dragging: string | null,
  updateNodes: (leftNode: { value?: any, content: [string, string][]}, rightNode: { value?: any, content: [string, string][]}) => void
  nodes: {[key: string]: { value?: any, content: [string, string][]}}
  updatePath: (path: [[string, string], ...[string, string][]]) => void,
  path: [[string, string], ...[string, string][]]
  value: any,
}) {
  // const [showTree, setShowTree] = React.useState(true)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: `${leftNode}-${rightNode}`});
  
  const style = {
    padding: '5px 10px 5px 0px',
    transform: CSS.Transform.toString(transform),
    transition,
    ...(dragging && dragging !== `${leftNode}-${rightNode}`) ? {opacity: 0.7} : {}
  };


  
  const Row = getRow(nodes, leftNode)
 
  const RowMenu = getRowMenu(nodes, leftNode)


  // console.log('roweview debug', leftNode, rightNode, nodes, updateRow, Row)

  const zoom = () => {
    updatePath([[leftNode, rightNode], ...path])
  }


  const updateRow = (leftValue: {value?: any, content: [string, string][]}, rightValue: {value?: any, content: [string, string][]}) => {
    updateNodes(leftValue, rightValue)
  }

  return (
    <div style={style} className="flex" ref={setNodeRef} {...attributes} {...listeners}>
      <div className="flex-none w-25 flex">
        <div className="flex w-100">
          <span style={{padding: '0 0 0 15px'}}>
            <ZoomComponent zoom={zoom}>
              <div>
                <div className='w-60' style={{padding: '15px 0'}}>
                  <ChangeInstruction nodes={nodes} instructionNode={leftNode} updateRow={() => {console.log('test23')}} />              
                </div>
                <div className='flex items-center' style={{padding: '15px 0'}}>
                  <RowMenu valueNode={rightNode} nodes={nodes} />
                </div>
              </div>
            </ZoomComponent> 
          </span>
          <span
            style={{
              padding: '15px 0',
              opacity: dragging === `${leftNode}-${rightNode}` ? '1' : '0' 
            }} >
            <DragHandleDots2Icon />
          </span>
        </div>
      </div>
      <div className="flex-initial w-96">
        <Row leftNode={leftNode} rightNode={rightNode} nodes={nodes} updateNodes={updateNodes} />
      </div>
      {/* <div className="flex-none w-14 flex">
        <AddDep 

        />
      </div> */}
    </div>
  )
}



const AddDep = ({
}: {
}) => {

  const handleAddDep = () => {

  }

  return (
    <Button 
      onClick={handleAddDep} variant='ghost'
      style={{padding: '15px 15px 15px 15px'}}
      >
      <PlusCircledIcon />
    </Button>
  )
}


export default RowView




const getRow = (nodes: { [key: string]: {value?: any, content: [string, string][] }}, left: string) => {

  const matchesLeft = left.match(/^[\{](\w+)[\}]$/)
  // const matchesRight = rightNode.match(/^[\{]\w[\}]$/)

  console.log('leftNode', matchesLeft, !matchesLeft, !matchesLeft?.[1])

  if (!matchesLeft || !matchesLeft?.[1]){
    const leftNode = nodes[left]
    throw new Error(`composite left node not implemented: ${left}(${leftNode})`)
  }
 
  const dict: {[key: string]: any} = {
    "folder": FolderRow,
    "coreFolder": CoreFolderRow,
    "checklist": TaskRow,
  }

  const component = dict[matchesLeft[1]]
  if (!component) {
    throw new Error(`no component for ${matchesLeft[1]}`)
  }

  return component
}


const getRowMenu = (nodes: { [key: string]: {value?: any, content: [string, string][] }}, left: string) =>  {

  return FolderRowMenu
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


const ChecklistRow = ({
  left,
  right,
  dragging, 
  nodes,
  updateNodes,
  appendToPath,
  value,
} : {
  left: string,
  right: string,
  dragging: string | null,
  nodes: {[key: string]: { value?: any, content: [string, string][]}}
  updateNodes: (nodes: any) => void
  appendToPath: (left: string, right: string) => void
  value: any,
}) => {



  return (<div>test</div>)
}

