import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req:Request) {
    const WEEBHOOK_SECRET = process.env.WEEBHOOK_SECRET

    
}