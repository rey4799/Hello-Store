import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./helpers/utils";

export async function middleware(request: NextRequest) {
  const auth = request.cookies.get("Authorization");

  if (request.nextUrl.pathname.startsWith("/login")) {
    if (auth) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  }

  if (request.nextUrl.pathname.startsWith("/wishlist")) {
    if (auth) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/api/wishlist")) {

    if (!auth) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const [_, token] = auth.value.split(" ");
    // console.log(token, "ini token");
    
    if (!token) {
      return NextResponse.json(
        {
          message: "Invalid token",
        },
        { status: 401 }
      );
    }

    try {
      
      const data = await verifyToken(token);
      // console.log(data, 'ini data verify');

      const userId = data._id;
      // console.log(userId);

      if (typeof userId !== "string") {
        throw new Error("Invalid userId type");
      }
      
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", userId);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.json(
        {
          message: "Invalid token",
        },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/api/wishlist/:path*",
    "/wishlist/:path*",
  ],
};
