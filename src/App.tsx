import './App.css'
import './app/global.css'
import React from 'react'

import HamburgerMenu from '@/components/menu/HamburgerMenu'
import { ThemeProvider } from "@/components/theme-provider"

import FosReact from '@/components/fos'

function App() {


  const pathCallback = (path: [string | string][]) => {

  }

  return (
    <div className="App" style={{ height: '100%', width: '100%', position: 'relative', touchAction: 'none', textAlign: 'center', margin: '0 auto' }}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div style={{textAlign: 'left'}} className='w-full'>
            <HamburgerMenu />
            <div className="flex items-center justify-center h-full w-full" style={{padding: '15px'}}>
              <FosReact pathCallback={pathCallback} />
            </div>
          </div>
        </ThemeProvider>
    </div>
 
  )
}

export default App
