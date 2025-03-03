import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const protectedRoute = createRouteMatcher([
  '/profile',
  '/courses',
  '/courses/[courseId]',
  '/courses/[courseId]/lessons',
  

]);

export default clerkMiddleware(async (auth, req) => {
  if (protectedRoute(req)) {
    const authObject = await auth();
    if (!authObject.userId) {
      return authObject.redirectToSignIn();
    }
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};