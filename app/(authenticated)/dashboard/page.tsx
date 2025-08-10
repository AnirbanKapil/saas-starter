"use client"

import { Todo } from '@/app/generated/prisma'
import { useUser } from '@clerk/nextjs'
import React, { useCallback, useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

function Dashboard() {
  
   const {user} = useUser()
   const [todos , setTodos] = useState<Todo[]>([])
   const [totalPage,setTotalPage] = useState("")
   const [currentPage,setCurrentPage] = useState(1)
   const [searchTerm , setSearchTerm] = useState("") 
   const [loading,setLoading] = useState(false)
   const [isSubscribed,setIsSubscribed] = useState("")

   const [debounceSearchTerm] = useDebounceValue(searchTerm,300)

   const fetchTodos = useCallback(async (page : number) => {
     try {
        setLoading(true)
        
        const response = await fetch(`/api/todos?page=${page}&search=${debounceSearchTerm}`)
        if(!response.ok){
          throw new Error("Failed to fetch todos")
        }
        
        const data = await response.json()

        setTotalPage(data.totalPages)
        setTodos(data.todos)
        setCurrentPage(data.currentPage)
        setLoading(false)
     } catch (error) {
        console.log("error fetching todos . Error --",error)
        setLoading(false)
     }
   } , [debounceSearchTerm])


   const fetchSubscription = async () => {
    const response = await fetch("/api/subscription")

    if(!response.ok){
      throw new Error("Failed to fetch info regarding subscription")
    }

    const data = await response.json()
    
    setIsSubscribed(data.isSubscribed)

   }


   useEffect(()=>{
    fetchTodos(1);
    fetchSubscription()
   },[]) 

    
   const handleAddTodos = async (title : string) => {
    try {
      const response = await fetch("/api/todos",{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({title})
      })
      if(!response.ok){
        throw new Error("Failed to upload todos")
      }

      await fetchTodos(currentPage)
    } catch (error) {
      console.log("Error uploading todo.Error--",error)
    }
   } 


    return (
    <div></div>
  )
}

export default Dashboard