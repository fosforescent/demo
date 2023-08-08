'use client'

import { useState, useEffect, useRef } from 'react'
import { userService } from '../services'
import { useRouter } from 'react-router-dom'

export const AuthCheck = ({ children }: { children: React.ReactNode }) => {

  const authorized = useAuthCheck()

  return authorized ? <>{children}</> : <div>Not authorized</div>
}

const useAuthCheck  = () => {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)



  const pathname = usePathname(); // Get current route

  // Save pathname on component mount into a REF
  const savedPathNameRef = useRef(pathname);

  useEffect(() => {
    // If REF has been changed, do the stuff
    if (savedPathNameRef.current !== pathname) {
      setAuthorized(false)
      // Update REF
      savedPathNameRef.current = pathname;
    }
    authCheck(pathname)

  }, [pathname]);


  console.log('heretoo')
  function authCheck(url: any) {
    // redirect to login page if accessing a private page and not logged in
    console.log('here')
    const publicPaths = ['/login']
    const path = url.split('?')[0]
    // const validUser = user && userService.userValue.username === user.username
    if (!userService.userValue?.username && !publicPaths.includes(path) && !path.startsWith('/demo')) {
      setAuthorized(false)
      router.push('/login')
    } else {
      setAuthorized(true)
    }
  }

  return authorized

}