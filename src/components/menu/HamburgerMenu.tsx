import React, { useState } from 'react'

import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function ModeToggle() {
  const { setTheme } = useTheme()
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false)


  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div style={{textAlign: 'right', padding: '5px', borderBottom: '1px solid #99EECC'}} >
<Sheet>
  <SheetTrigger asChild><span style={{padding: '5px'}}> &#9776;</span></SheetTrigger>
  <SheetContent>
      <SheetHeader>
        Fos
      </SheetHeader>
      <nav>
              <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Navigation">
                    <CommandItem>
                      <SheetClose asChild>
                   <a href='/todo' onClick={toggleMenu}>
                      Inbox
                    </a>
                                </SheetClose>
                    </CommandItem>
                    <CommandItem>
                                <SheetClose asChild>
                   <a href='/workflow' onClick={toggleMenu}>
                     Workflows 
                    </a>
                                </SheetClose>
                    </CommandItem>
                    {/* <CommandItem>
                                <SheetClose asChild>
                   <Link href='/calendar' onClick={toggleMenu}>
                      Calendar
                    </Link>
                                </SheetClose>
                    </CommandItem> */}
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Actions">
                    {/* <CommandItem>
                                <SheetClose asChild>
                      <Link href='/' onClick={toggleMenu}>
                        Home
                      </Link>
                                </SheetClose>
                    </CommandItem> */}
                    <CommandItem>
                                <SheetClose asChild>

                      <a href='/login' onClick={() => { toggleMenu(); localStorage.clear(); window.location.reload()}}>
                        Logout 
                      </a>
                                </SheetClose>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
     </nav>
          <ModeToggle />
    </SheetContent>
  </Sheet> 
  </div>
  )
}

export default HamburgerMenu