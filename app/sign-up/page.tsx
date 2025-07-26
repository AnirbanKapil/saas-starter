import React, { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button' 
import { Input } from "@/components/ui/input"
import Loader from '@/components/loader/Loader'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"




function SignUp() {
  
  const {isLoaded,signUp,setActive} = useSignUp()  
  const [emailAddress,setEmailAddress] = useState("")
  const [password,setPassword] = useState("")
  const [pendingVerification,setPendingVerification] = useState(false)
  const [error,setError] = useState("")
  const [code,setCode] = useState("")
  const [showPassword,setShowPassword] = useState("")

  const router = useRouter()

  if(!isLoaded){
    return <Loader />
  }

  async function submit (e : React.FormEvent) {
    e.preventDefault()
    if(!isLoaded) return <Loader />

    try {
      await signUp.create({
        emailAddress,
        password
      })
      await signUp.prepareEmailAddressVerification({
        strategy : "email_code"
      })
      setPendingVerification(true)
    } catch (error:any) {
      console.log(JSON.stringify(error,null,2))
      setError(error.errors[0].message)
    }
  }

  async function onPressVerify (e : React.FormEvent) {
    e.preventDefault()
    if(!isLoaded) return <Loader />

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({code})
      if(completeSignUp.status !== "complete"){
        console.log(JSON.stringify(completeSignUp,null,2))
      }
      if(completeSignUp.status === "complete"){
        await setActive({session:completeSignUp.createdSessionId})
        router.push("/dashboard")
      }
    } catch (error : any) {
      console.log(JSON.stringify(error,null,2))
      setError(error.errors[0].message)
    }
  }

  return (
    
  )
}

export default SignUp