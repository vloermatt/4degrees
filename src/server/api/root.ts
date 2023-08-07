import { rugbyRouter } from "~/server/api/routers/rugby";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  rugby: rugbyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
