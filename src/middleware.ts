import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path=request.nextUrl.pathname;
    const isPublicPath= path==="/login" || path==="/signup"
    const token=request.cookies.get("token")?.value || "";
    if(!token && !isPublicPath) {
        // If the user is not authenticated and trying to access a protected route, redirect to login
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    if(token && isPublicPath) {
        // If the user is authenticated and trying to access a public route, redirect to profile
        return NextResponse.redirect(new URL("/profile", request.nextUrl));
    }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    
    "/profile/:path*",
    "/signup",
  ]
};
