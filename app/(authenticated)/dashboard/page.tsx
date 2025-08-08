"use client"

import { Todo } from '@/app/generated/prisma'
import { useUser } from '@clerk/nextjs'
import React, { useCallback, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

function Dashboard() {
  
   const {user} = useUser()
   const [todos , setTodos] = useState<Todo[]>([])
   const [totalPage,setTotalPage] = useState("")
   const [currentPage,setCurrentPage] = useState("")
   const [searchTerm , setSearchTerm] = useState("") 
   const [loading,setLoading] = useState(false)

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
        setLoading(false)
     }
   } , [debounceSearchTerm])
    
    return (
    <div></div>
  )
}

export default Dashboard