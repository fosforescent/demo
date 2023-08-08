'use client'

import LoginRegisterScreen from './login-register-screen'
import LogoutScreen from './logout-screen'

import { useMemo } from 'react'
import { userService } from '@/services'

const LoginPage = () => {
  const loggedIn = useMemo(() => {
    return !!(userService.userValue)
  }, [])

  return loggedIn ? <LogoutScreen username={userService.userValue.username} /> : <LoginRegisterScreen />
}

export default LoginPage