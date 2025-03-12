// middleware.ts
// import { Protect } from "@clerk/nextjs/dist/types/client-boundary/controlComponents";

// INFO: By default, clerkMiddleware will not protect any routes. All routes are public and you must opt-in to protection for routes.

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
//_________________________________________

// // Define public routes that don’t require authentication
// const isPublicRoute = createRouteMatcher([
//   "/", // Homepage
//   "/sign-in(.*)", // Sign-in page and subroutes
//   "/sign-up(.*)", // Sign-up page and subroutes
//   "/api/classify-ingredients(.*)", // Public API endpoint and its subroutes
// ]);

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // "/(api|trpc)(.*)", // Ensures middleware runs on API routes
//   ],
// };

// import { clerkMiddleware } from "@clerk/nextjs/server";

// ________________________

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//     // Always run for API routes, except for /api/classify-ingredient/**
//     "/(api|trpc)(?!/classify-ingredient)(.*)",
//   ],
// };
