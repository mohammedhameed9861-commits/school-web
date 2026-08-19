import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Let /admin routes bypass locale handling entirely.
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }
  return intlMiddleware(request);
}

export const config = {
  // Apply to everything except API routes, Next.js internals, and static assets.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
