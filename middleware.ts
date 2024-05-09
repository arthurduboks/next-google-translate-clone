import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isSignInRoute = createRouteMatcher(["/sign-in"]);

export default clerkMiddleware((auth, req) => {
  if (isSignInRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/translate", "/(api|trpc)(.*)"],
};
