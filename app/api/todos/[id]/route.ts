import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";


export async function  DELETE (req : NextRequest , {params} : {params : {id : string}}) {
    const {userId} = await auth()

    if(!userId){
        return NextResponse.json({error : "user not found"},{status : 401})
    }

    try {
        const todoId = params.id

        const todo = await prisma.todo.findUnique({
            where : {id : todoId}
        })
        if(!todo){
            return NextResponse.json({error : "Todo not found"},{status : 401})
        }
        
        if(todo.userId !== userId){
            return NextResponse.json({error : "Forbidden"},{status : 402})
        }

        await prisma.todo.delete({
            where : {id : todoId}
        })

          return NextResponse.json({message : "todo deleted successfully !!"},{status : 201})
    } catch (err) {
        console.log("error deleting todo . Error ---",err)  
        return NextResponse.json( 
      { error: "Error deleting todo" },
      { status: 500 }
    );
    }
}