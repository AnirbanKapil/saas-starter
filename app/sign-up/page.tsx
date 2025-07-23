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
    } catch (error) {
      
    }
  }
}

export default SignUp