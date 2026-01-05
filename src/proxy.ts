export { auth as proxy } from "@/auth"

// Use "matcher" to selectively apply middleware to specific routes.
// See https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/account/:path*", "/book"],
}
