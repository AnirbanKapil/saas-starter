import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req:Request) {
    const WEEBHOOK_SECRET = process.env.WEEBHOOK_SECRET

    if(!WEEBHOOK_SECRET){
        throw new Error("Please add weebhook secret")
    }

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id")
    const svix_timestamp = headerPayload.get("svix-timestamp")
    const svix_signature = headerPayload.get("svix-signature")

    if(!svix_id || !svix_timestamp || !svix_signature){
        return new Response ("Error occured - No svix headers")
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)
    
    const wh = new Webhook(WEEBHOOK_SECRET)

    let evnt : WebhookEvent
    
    try {
        evnt = wh.verify(body,{
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.log("Error occured while verifying WeebHook . Error--",err)
        return new Response("Error occured while erifying WeebHook",{status : 400}) 
    }

    const {id} = evnt.data
    const eventType = evnt.type

    if(eventType === "user.created"){
       try {
         const {email_addresses , primary_email_address_id} = evnt.data
 
         const primaryEmail = email_addresses.find(
             (email) => email.id === primary_email_address_id
         )
 
         if(!primaryEmail){
             return new Response("No primary email found",{status : 400})
         }

        const newUser = await prisma.user.create({
            data : {
                id : id!,
                email : primaryEmail.email_address,
                isSubscribed : false
            }
        })
            console.log("New User created",newUser)
       } catch (error) {
            console.log("Error creating user in DB error --",error)
            return new Response("Error creating user in database",{status : 400})          
       }

    }

    return new Response("WebHook received successfully",{status : 200})
}