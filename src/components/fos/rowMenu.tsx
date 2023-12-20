import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import React, { JSXElementConstructor, ReactElement } from 'react'

import {
  Combobox
} from "@/components/combobox/combobox"

import useLongPress from '../long-press'

import { Crosshair1Icon, DiscIcon, QuestionMarkCircledIcon, PlayIcon, DragHandleDots2Icon, DotsVerticalIcon, ComponentNoneIcon, TrashIcon, PlusCircledIcon  } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"
import { SearchIcon, Check, Plus} from 'lucide-react';
import { Input } from '@/components/ui/input'


export const MenuOverlayComponent = ({
  open,
  setMenuOpen,
  leftNode,
  nodes,
  rightNode,
  updateNodes,
  path,
  allowedChildren,
  rowMenuComponent,
  // updatePath,
}: {
  leftNode: string,
  rightNode: string,
  path: [[string, string], ...[string, string][]],
  // updatePath: (path: [[string, string], ...[string, string][]]) => void
  nodes: {[key: string]: { value?: any, content: [string, string][]}}
  updateNodes: (nodes: {[key: string]: { value?: any, content: [string, string][]}}) => void
  allowedChildren: string[]
  rowMenuComponent: any
  open: boolean
  setMenuOpen: (open: boolean) => void
}) => {

  const RowMenu = rowMenuComponent

  return (  
  <Sheet  open={open} onOpenChange={setMenuOpen}>
    <SheetContent  side={"left"}>
      <SheetHeader>
        Actions
      </SheetHeader>
        <div>
          <div className='w-60' style={{padding: '15px 0'}}>
            <ChangeInstruction nodes={nodes} leftNode={leftNode} rightNode={rightNode} updateNodes={updateNodes} path={path} allowedChildren={allowedChildren} />              
          </div>
          <div className='flex items-center' style={{padding: '15px 0'}}>
            <RowMenu rightNode={rightNode} leftNode={leftNode} path={path} nodes={nodes} updateNodes={updateNodes} />
          </div>
        </div>
    </SheetContent>
  </Sheet>)

}


export function MenuComponent({
  updatePath,
  leftNode,
  rightNode,
  path,
  canZoom,
  allowedChildren,
  rowMenuComponent,
  nodes,
  updateNodes

}: {
  updatePath: (path: [[string, string], ...[string, string][]]) => void
  leftNode: string
  rightNode: string
  path: [[string, string], ...[string, string][]],
  canZoom: boolean
  allowedChildren: string[]
  rowMenuComponent: any
  nodes: {[key: string]: { value?: any, content: [string, string][]}}
  updateNodes: (nodes: {[key: string]: { value?: any, content: [string, string][]}}) => void
}) {

  const [menuOpen, setMenuOpen] = React.useState(false)


  const onLongPress = () => {
    setMenuOpen(true)
  }
  
  const onClick = () => {
    zoom()
  }

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };


  const zoom = () => {
    updatePath([...path, [leftNode, rightNode]])
  }


  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  return (
    <>      
      <MenuOverlayComponent 
        open={menuOpen} 
        setMenuOpen={setMenuOpen} 
        rowMenuComponent={rowMenuComponent} 
        allowedChildren={allowedChildren} 
        leftNode={leftNode} 
        rightNode={rightNode}
        path={path}
        nodes={nodes}
        updateNodes={updateNodes} />
      {canZoom ? (
        <Button
          variant={"secondary"}
          style={{ background: 'transparent', padding: '10px 10px 10px 0px'}}
          {...longPressEvent}
          >
        <DiscIcon  />
        </Button>
      ) : (
        <Button
          variant={"secondary"}
          style={{ background: 'transparent', padding: '10px 10px 10px 0px'}}
          onClick={() => setMenuOpen(true)}
          >
          <DotsVerticalIcon />
        </Button>
      )}
    </>
  )
}



export const ChangeInstruction = ({
  leftNode,
  nodes,
  rightNode,
  updateNodes,
  path,
  allowedChildren
  // updatePath,
}: {
  leftNode: string,
  rightNode: string,
  path: [[string, string], ...[string, string][]],
  // updatePath: (path: [[string, string], ...[string, string][]]) => void
  nodes: {[key: string]: { value?: any, content: [string, string][]}}
  updateNodes: (nodes: {[key: string]: { value?: any, content: [string, string][]}}) => void
  allowedChildren: string[]
}) => {


  const handleChange = (e: any) => {

      const newLeft = `{${e.target.value}}`

      const [parentLeft, parentRight] = path[path.length - 1] as [string, string]
      const parentNode = nodes[parentRight]
      if (!parentNode) {
        throw new Error(`no parent node for ${parentRight}... shouldn't have gotten here`)
      }
      const newContent = parentNode.content.map((item) => (item[0] === leftNode && item[1] === rightNode) ? [newLeft, item[1]] as [string, string] : item)
      updateNodes({...nodes, [parentRight]: {...parentNode, content: newContent } })
  }

  const valueItems = allowedChildren.map((item) => {
    if (item === 'description') {
      return ({value: item, label: 'Description'})
    }
    if (item === 'checklist') {
      return ({value: item, label: 'Checklist'})
    }
    return ({value: item, label: item})
  })


  const matchesLeft = leftNode.match(/^[\{](\w+)[\}]$/)
  if (!matchesLeft || !matchesLeft?.[1]){
    throw new Error(`composite left node not implemented: ${leftNode}`)
  }

  return (<div className="flex join-horizontal items-center">
    <Combobox className='rounded-l-lg rounded-r-none w-full bg-muted' onChange={handleChange} values={valueItems} defaultValue={matchesLeft[1]} />
    <Button variant="secondary" className='rounded-r-lg rounded-l-none'><Plus /></Button>
  </div>)
}
