import React, { useState } from 'react'

import { useAppState } from '@/components/app-state'
 
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import { Input } from '../ui/input'



const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false)



  const [token, setToken] = React.useState(localStorage.getItem("token") || "");

  const updateToken = (e: any) => {
    localStorage.setItem("token", e.target.value)
    setToken(e.target.value)
  }

  return (
    <div style={{textAlign: 'right', padding: '5px', borderBottom: '1px solid #99EECC'}} >
<Sheet>
  <SheetTrigger asChild><span style={{padding: '5px'}}> &#9776;</span></SheetTrigger>
  <SheetContent>
      <SheetHeader>
        Fos
      </SheetHeader>
      <SheetTitle>
        Settings
      </SheetTitle>
      <div className='padding-lg'>
        <Input placeholder="openai token" value={token} onChange={updateToken} />
      </div>
    </SheetContent>
  </Sheet> 
  </div>
  )
}

export default HamburgerMenu