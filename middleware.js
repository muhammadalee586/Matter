import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isLoggedIn = !!token;
    const isAdmin = token?.role === "admin";

    if (pathname.startsWith("/admin") && !isAdmin) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname.startsWith("/account") && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/account/:path*"],
};