import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import createBoard from "../resolvers/tallyBoard/createBoard";
import CreateBoardSchema from "../schemas/CreateBoardSchema";

export const tallyBoardRouter = createTRPCRouter({
  createBoard: publicProcedure
    .input(CreateBoardSchema)
    .mutation(async ({ ctx, input }) => {
      return await createBoard({ ctx, input });
    }),
  getTallyBoards: publicProcedure
    .input(
      z.object({
        leagueId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.tallyBoard.findMany({
        where: {
          leagueId: input.leagueId,
        },
        include: {
          home: true,
          away: true,
        },
      });
    }),
  getTallyBoard: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.tallyBoard.findFirst({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          leagueId: true,
          open: true,
          homeId: true,
          awayId: true,
          halfAwayScore: true,
          halfHomeScore: true,
          homeScore: true,
          awayScore: true,
          home: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
          away: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
        },
      });
    }),
});
