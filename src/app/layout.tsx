
import './globals.css'
import HamburgerMenu from '../components/menu/HamburgerMenu'
import { ThemeProvider } from "@/components/theme-provider"
 
export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}


export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
 

  // let user
  // try {
  //   user = await checkAuth()  
  // } catch (e) {
  //   return NextResponse.redirect('/login')
  // }


  return (
    <html style={{ height: '100%', width: '100%', position: 'relative', touchAction: 'none' }} lang="en">
      <body style={{ height: '100%', width: '100%', position: 'relative', touchAction: 'none', textAlign: 'center', margin: '0 auto' }}>
      <AuthCheck>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div style={{textAlign: 'left'}} className='w-full'>
            <HamburgerMenu />
            <div className="flex items-center justify-center h-full w-full" style={{padding: '15px'}}>
            {children}
            </div>
          </div>
        </ThemeProvider>
      </AuthCheck>
      </body>
    </html>
  )
}


