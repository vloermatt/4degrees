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
  getTallies: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.tally.findMany();
  }),
  getTally: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.tally.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
});
