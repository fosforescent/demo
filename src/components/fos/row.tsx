'use client'

import React, { ReactElement, useEffect } from 'react'
import { Crosshair1Icon, DiscIcon, QuestionMarkCircledIcon, PlayIcon, DragHandleDots2Icon, DotsVerticalIcon, ComponentNoneIcon, TrashIcon, PlusCircledIcon  } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"

import useLongPress from '../long-press'

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
import { SearchIcon, Check, Plus} from 'lucide-react';

import { cn } from '@/lib/utils'

export function RowView({
  leftNode,
  rightNode,
  dragging,
  updateRow,
  nodes,
  zoom
}: {
  leftNode: string,
  rightNode: string,
  dragging: string | null,
  updateRow: (leftNode: { value?: any, content: [string, string][]}, rightNode: { value?: any, content: [string, string][]}) => void
  nodes: {[key: string]: { value?: any, content: [string, string][]}}
  zoom: () => void
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




  if (leftNode === 'nativeInstruction') {

  }

  if (rightNode === 'nativeValue') {
    console.log('herenv')
  }




  const leftNodeObj = nodes[leftNode] ? nodes[leftNode] : null
  const rightNodeObj = nodes[rightNode] ? nodes[rightNode] : null

  if (!leftNodeObj || !rightNodeObj) {
    console.log('nodes', nodes)
    throw new Error(`missing node: l(${leftNode}) r(${rightNode})`)
  }


  // console.log('leftNodeObj', leftNodeObj)
  // console.log('rightNodeObj', rightNodeObj)
 
  const Row = getRow(leftNodeObj)
 
  const RowMenu = getRowMenu(leftNodeObj)


  // console.log('roweview debug', leftNode, rightNode, nodes, updateRow, Row)


  return (
    <div style={style} className="flex" ref={setNodeRef} {...attributes} {...listeners}>
      <div className="flex-none w-25 flex">
        <div className="flex w-100">
          <span style={{padding: '0 0 0 15px'}}>
            <ZoomComponent zoom={zoom}>
              <div>
                <div className='w-60' style={{padding: '15px 0'}}>
                  <ChangeInstruction nodes={nodes} instructionNode={leftNodeObj} updateRow={() => {console.log('test23')}} />              
                </div>
                <div className='flex items-center' style={{padding: '15px 0'}}>
                  <RowMenu valueNode={rightNodeObj} nodes={nodes} />
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
        <Row leftNode={leftNodeObj} rightNode={rightNodeObj} nodes={nodes} updateRow={updateRow} />
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


const MenuComponent = ({
  open,
  setMenuOpen,
  content
}: {
  open: boolean
  setMenuOpen: (open: boolean) => void
  content: ReactElement
}) => {

return (  
<Sheet  open={open} onOpenChange={setMenuOpen}>
  <SheetContent  side={"left"}>
      <SheetHeader>
        Actions
      </SheetHeader>
      <SheetDescription>
      {content}
      </SheetDescription>
    </SheetContent>
  </Sheet>)

}


function ZoomComponent({
  children,
  zoom,
}: {
  children: ReactElement
  zoom: () => void
}) {

  const [menuOpen, setMenuOpen] = React.useState(false)


  const onLongPress = () => {
    setMenuOpen(true)
  }
  
  const onClick = () => {
    zoom()
    console.log('clicked')
  }

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };

  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  return (
    <>      
      <MenuComponent open={menuOpen} setMenuOpen={setMenuOpen} content={children} />
      <Button
        variant={"secondary"}
        style={{ background: 'transparent', padding: '10px 10px 10px 0px'}}
        {...longPressEvent}
      >
      <DiscIcon  />
      </Button>

    </>
  )
}

export default RowView



const ChangeInstruction = ({
  instructionNode,
  nodes,
  updateRow
}: {
  instructionNode: {value?: any, content: [string, string][] },
  nodes: {[key: string]: { value?: any, content: [string, string][]}}
  updateRow: (leftNode: string, rightNode: string) => void
}) => {

  const values = ["folder", "task"]


  return (<div className="flex join-horizontal items-center">
    <Button variant="secondary" className='rounded-l-lg rounded-r-none'><SearchIcon /></Button>
    <Input placeholder='test' className='rounded-none'/>
    <Button variant="secondary" className='rounded-r-lg rounded-l-none'><Plus /></Button>
  </div>)
}


const getRow = (leftNode: {value?: any, content: [string, string][] }) => {

  const nativeInstructions = leftNode.content.filter((edge: any) => edge[0] === "nativeInstruction")
  const nativeInstruction = nativeInstructions.length > 0 ? nativeInstructions[0] ? nativeInstructions[0][1] : null : null
  // if (!nativeInstruction) {
  //   throw new Error(`missing nativeInstruction: ${JSON.stringify(leftNode)}}`)
  // }
  // console.log('nativeInstruction', nativeInstruction)
  const dict: {[key: string]: any} = {
    "folder": FolderRow,
    "coreFolder": CoreFolderRow,
    "task": TaskRow,
  }


  const component = nativeInstruction ? dict[nativeInstruction] || TaskRow : TaskRow
  // console.log('component', component, nativeInstruction)
  return component
}


const getRowMenu = (leftNode: {value?: any, content: [string, string][] }) =>  {

  return FolderRowMenu
}
