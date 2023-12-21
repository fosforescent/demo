'use client'

import React from 'react'
import { Crosshair1Icon, DiscIcon, QuestionMarkCircledIcon, PlayIcon, DragHandleDots2Icon, DotsVerticalIcon, ComponentNoneIcon, TrashIcon, PlusCircledIcon  } from '@radix-ui/react-icons'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


import { Input } from '@/components/ui/input'
import {
  StringRow,
  TaskRow,
  ChecklistRow,
  FolderRow,
  ChecklistRowMenu,
} from './rowComponents'

import { Button } from "@/components/ui/button"

import { MenuComponent, ChangeInstruction } from './rowMenu'

export default function RowView({
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
  updateNodes: (nodes: {[key: string]: { value?: any, content: [string, string][]}}) => void
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


  
  const {
    component: Row,
    menu: RowMenu,
    canZoom: canZoom,
    allowedChildren: allowedChildren,
  } = getRowInfo(nodes, leftNode)
 


 

  return (
    <div style={style} className="flex" ref={setNodeRef} {...attributes} {...listeners}>
      <div className="flex-none w-25 flex">
        <div className="flex w-100">
          <span style={{padding: '0 0 0 15px'}}>
            <MenuComponent 
              canZoom={canZoom} 
              leftNode={leftNode} 
              rightNode={rightNode} 
              path={path} 
              updatePath={updatePath} 
              allowedChildren={allowedChildren} 
              rowMenuComponent={RowMenu}
              nodes={nodes}
              updateNodes={updateNodes} />
              
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
        <Row leftNode={leftNode} rightNode={rightNode} nodes={nodes} updateNodes={updateNodes} path={path} />
      </div>
      {/* <div className="flex-none w-14 flex">
        <AddDep 

        />
      </div> */}
    </div>
  )
}






const getRowInfo = (nodes: { [key: string]: {value?: any, content: [string, string][] }}, left: string) => {

  const matchesLeft = left.match(/^[\{](\w+)[\}]$/)
  // const matchesRight = rightNode.match(/^[\{]\w[\}]$/)


  if (!matchesLeft || !matchesLeft?.[1]){
    const leftNode = nodes[left]
    throw new Error(`composite left node not implemented: ${left}(${leftNode})`)
  }
 
  const dict: {[key: string]: any} = {

    "checklist": {
      component: ChecklistRow,
      menu: ChecklistRowMenu,
      canZoom: true,
      allowedChildren: ["checklist", "description"],
    },

    "description": {
      component: StringRow,
      menu: ChecklistRowMenu,
      canZoom: false,
      allowedChildren: [],
    }
  }

  const component = dict[matchesLeft[1]]
  if (!component) {
    throw new Error(`no component for ${matchesLeft[1]}`)
  }

  return component
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



