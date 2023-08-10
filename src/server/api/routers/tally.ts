import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tallyRouter = createTRPCRouter({
  createTally: publicProcedure
    .input(
      z.object({
        nickname: z.string(),
        avatar: z.string(),
        home: z.number(),
        away: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.tally.create({
        data: {
          ...input,
        },
      });
    }),
});
