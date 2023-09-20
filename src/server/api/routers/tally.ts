import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { pusher } from "~/utils/pusher";

export const tallyRouter = createTRPCRouter({
  createTally: publicProcedure
    .input(
      z.object({
        nickname: z.string(),
        avatar: z.string(),
        home: z.number(),
        away: z.number(),
        boardId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("input", input);
      const tally = await ctx.prisma.tally.create({
        data: {
          ...input,
        },
      });
      await pusher.trigger("rugby-tallies", tally.boardId, {
        ...tally,
      });
      return tally;
    }),
  getTallies: publicProcedure
    .input(
      z.object({
        boardId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.tally.findMany({
        where: {
          boardId: input.boardId,
        },
      });
    }),
  getTally: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!input.id) return null;
      return await ctx.prisma.tally.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
  shake: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      pusher.trigger("tally", input.id, input);
    }),
});
