import './index.css'
import './App.css'
import './global.css'
import React from 'react'

import HamburgerMenu from '@/components/menu/HamburgerMenu'
import { ThemeProvider } from "@/components/theme-provider"

import FosReact from '@fosforescent/react-client'
import { promptGPT } from '@/lib/promptGPT'

function App() {


  
  const [data, setData] = React.useState<any>(null) 

  const setDataWithLog = (data: any) => {
    console.log('setData', data)
    setData(data)
  }


  
  // const options: FosReactOptions = {
  //   canPromptGPT,
  //   promptGPT,
  //   undo,
  //   canUndo,
  //   redo,
  //   canRedo,
  //   toast,
  //   modules: {
  //     core: ["workflow", "duration"]
  //   }
  // }

  const hasToken = !!localStorage.getItem('token')

  return (
    <div className="App" style={{ height: '100%', width: '100%', position: 'relative', touchAction: 'none', textAlign: 'center', margin: '0 auto' }}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div style={{textAlign: 'left'}} className='w-full'>
            <HamburgerMenu />
            <div className="flex items-center justify-center h-full w-full" style={{padding: '15px'}}>
              <FosReact 
                data={data} 
                setData={setDataWithLog}
                options={{
                  canPromptGPT: hasToken,
                  promptGPT: promptGPT
                }}
                />
            </div>
          </div>
        </ThemeProvider>
    </div>
 
  )
}

export default App
