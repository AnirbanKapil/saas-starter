import { NextRequest , NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "../../../app/generated/prisma";
import prisma from "@/lib/prisma";


export async function isAdmin (userId : string) {
    const user = await clerkClient.users.getUser(userId)
    return user.privateMetadata.role === "admin"
}