import React, { useState } from 'react'

import { useAppState } from '@/components/app-state'
import { buttonVariants } from "@/components/ui/button"

import { images } from '@/assets'

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
import { Button } from '../ui/button'



const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const [infoOpen, setInfoOpen] = useState(false)

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
      <div className='p-3'>
        <label className='block text-sm font-medium text-gray-700' htmlFor="token">
          OpenAI API Token - warning: this is stored in your browser's localStorage 
        </label>
        <Input name="token" placeholder="openai token" value={token} onChange={updateToken} />
      </div>    
      <div className='p-3'>
        <Button variant='secondary' onClick={() => setInfoOpen(!infoOpen)}>Why? {infoOpen? '-' : '+'}</Button><br />
        {infoOpen ? 
          (<><a href='/' target='_blank' className='underline text-slate-400' >Fosforescent</a>&nbsp;
          is trying to become a visual programming language that intertwines human, computer,
          and AI instructions providing you with an interface to make your next steps clear, automate away your tedious tasks, and allow
          efficient decentralized planning and coordination
          </>)
          : <></>}
      </div>
      <div className='p-3'>
        <a href='https://buy.stripe.com/8wMdSz0rT6AKejKcMM' target='_blank' className={`${buttonVariants({ variant: "ghost" })} bg-emerald-900 `}>Tip $1 or more</a>
      </div>
      <div className='p-3 h-32 w-32'>
        <img src={images.btcCode} alt="btc-qrcode" className='object-stretch shrink-1' />
      </div>
      <div className='p-3 h-32 w-32'>
        <img src={images.ethCode} alt="eth-qrcode" className='object-stretch shrink-1' />
      </div>

    </SheetContent>
  </Sheet> 
  </div>
  )
}

export default HamburgerMenu