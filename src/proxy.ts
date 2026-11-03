import { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.redirect(
      new URL("/log-in", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/add-studio",
    "/my-bookings",
    "/my-listing",
    
  
  ],
};