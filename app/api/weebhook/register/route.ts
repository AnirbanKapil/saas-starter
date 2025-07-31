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
    
}