import { authMiddleware , clerkClient} from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ["/", "/api/webhook/register", "/sign-in", "/sign-up"]

export default authMiddleware({
  publicRoutes,
  
  async  afterAuth (auth, req : NextRequest) {
    if(!auth.userId && !publicRoutes.includes(req.nextUrl.pathname)){
      return NextResponse.redirect(new URL("/sign-in",req.url))
    }
    if(auth.userId){
      const user = await clerkClient.users.getUsers(auth.userId)
      const role = user.publicMetadata.role as string | undefined
    }
  }
  
  
});



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};