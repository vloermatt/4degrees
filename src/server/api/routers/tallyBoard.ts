import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tallyBoardRouter = createTRPCRouter({
  createBoard: publicProcedure
    .input(
      z.object({
        id: z.string(),
        leagueId: z.string(),
        open: z.boolean(),
        home_id: z.string(),
        home_name: z.string(),
        home_logo: z.string(),
        away_id: z.string(),
        away_name: z.string(),
        away_logo: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // create board and teams participating in the game
      const homeTeam = await ctx.prisma.team.findUnique({
        where: {
          id: input.home_id,
        },
      });
      const awayTeam = await ctx.prisma.team.findUnique({
        where: {
          id: input.away_id,
        },
      });
      if (!homeTeam) {
        await ctx.prisma.team.create({
          data: {
            id: input.home_id,
            name: input.home_name,
            logo: input.home_logo,
          },
        });
      }
      if (!awayTeam) {
        await ctx.prisma.team.create({
          data: {
            id: input.away_id,
            name: input.away_name,
            logo: input.away_logo,
          },
        });
      }
      return await ctx.prisma.tallyBoard.create({
        data: {
          id: input.id,
          leagueId: input.leagueId,
          open: input.open,
          homeId: input.home_id,
          awayId: input.away_id,
        },
      });
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
