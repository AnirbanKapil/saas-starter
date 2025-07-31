import { clerkMiddleware , clerkClient , createRouteMatcher} from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';


const isPublicRoutes = createRouteMatcher(["/", "/api/webhook/register", "/sign-in", "/sign-up"]) 

  export default clerkMiddleware ( async (auth, req : NextRequest) => {

    const {userId} = await auth()

    if(!userId && !isPublicRoutes(req)){
      return NextResponse.redirect(new URL("/sign-in",req.url))
    }
    if(userId){
      try {
         const user = await clerkClient.users.getUser(userId);
        const role = user.publicMetadata.role as string | undefined
  
        if(role === "admin" && req.nextUrl.pathname === "/dashboard"){
          return NextResponse.redirect(new URL("/admin/dashboard",req.url))
        }
  
        if(role !== "admin" && req.nextUrl.pathname.startsWith("/admin")){
          return NextResponse.redirect(new URL("/dashboard",req.url))
        }
  
        if(isPublicRoutes(req)){
          return NextResponse.redirect(new URL(
            role === "admin" ? "/admin/dashboard" : "/dashboard",
            req.url
          ))
        }
      } catch (error) {
        console.log(error)
        return NextResponse.redirect(new URL ("/error",req.url))
      }
    }
  }
) 
  
;



export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};