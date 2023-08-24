import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

export default function withAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
    return async (req: NextRequest, next: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname;
        
        // Check if the user has a token
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        
        if (token) {
            // If the user is authenticated and trying to access the /signin route,
            // redirect them to a different route (e.g., dashboard)
            if (pathname === "/signin" || pathname === "/signup") {
                return NextResponse.redirect("http://localhost:3000/");
            }
        } else if (requireAuth.includes(pathname)) {
            // If the user is not authenticated and trying to access a protected route,
            // redirect them to the /signin route with the callbackUrl
            const url = new URL("/signin", req.url);
            url.searchParams.set("callbackUrl", encodeURI(req.url));
            return NextResponse.redirect(url);
        }

        return middleware(req, next);
    };
}
