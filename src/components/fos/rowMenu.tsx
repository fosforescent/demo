import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import React, { ReactElement } from 'react'


import useLongPress from '../long-press'

import { Crosshair1Icon, DiscIcon, QuestionMarkCircledIcon, PlayIcon, DragHandleDots2Icon, DotsVerticalIcon, ComponentNoneIcon, TrashIcon, PlusCircledIcon  } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"
import { SearchIcon, Check, Plus} from 'lucide-react';
import { Input } from '@/components/ui/input'


export const MenuComponent = ({
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


export function ZoomComponent({
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


export const ChangeInstruction = ({
  instructionNode,
  nodes,
  updateRow
}: {
  instructionNode: string,
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
