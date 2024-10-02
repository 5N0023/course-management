import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// Define which paths don't require authentication
const publicPaths = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  // Fetch the token from local storage via cookies, because Next.js middleware runs on the server
  const token = cookies()?.get("token")?.value || null;
  const { pathname } = request.nextUrl;
  let validToken = false;
  // check token if valid by sending a request to the backend auth/verify as bareer token
  if (token) {
    try {
      const response = await fetch("http://localhost:5000/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        validToken = true;
      }
    } catch (error) {
      console.error(error);
    }
  }
  // If the user is trying to access a protected route without a token, redirect them to the login page
  if (!validToken && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the token exists and the user is trying to access login/signup, redirect them to the home page
  if (validToken && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Continue with the request
  return NextResponse.next();
}

// Specify the routes where this middleware should run
export const config = {
  matcher: ["/", "/login", "/signup", "/admin"],
};
