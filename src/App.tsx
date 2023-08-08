import './App.css'

import HamburgerMenu from '@/components/menu/HamburgerMenu'
import { ThemeProvider } from "@/components/theme-provider"

function App() {

  return (
    <div className="App" style={{ height: '100%', width: '100%', position: 'relative', touchAction: 'none', textAlign: 'center', margin: '0 auto' }}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div style={{textAlign: 'left'}} className='w-full'>
            <HamburgerMenu />
            <div className="flex items-center justify-center h-full w-full" style={{padding: '15px'}}>
            {children}
            </div>
          </div>
        </ThemeProvider>
    </div>
 
  )
}

export default App
