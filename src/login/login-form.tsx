
'use client'
// https://jasonwatmore.com/post/2021/08/04/next-js-11-jwt-authentication-tutorial-with-example-app#api-users-authenticate-js

import { useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { userService } from '@/services'

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"



export default LoginForm



const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
})


function LoginForm() {

  const router = useRouter()
  // get functions to build form with useForm() hook
  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
  
  const returnUrlOrArray = useSearchParams()?.get('returnUrl') || '/'


  function onSubmitLogin(values: z.infer<typeof formSchema>)  {
    return userService
      .login(values.username, values.password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl =
          Array.isArray(returnUrlOrArray) && returnUrlOrArray.length > 0
            ? returnUrlOrArray[0]
            : returnUrlOrArray
        router.push(returnUrl as string)
      })
      .catch((error) => {
        throw new Error(`login error ${error}`)
      })
  }

  return (
        <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmitLogin)} className="space-y-8">
         <FormField
          control={loginForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*******" type="password" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your password.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
