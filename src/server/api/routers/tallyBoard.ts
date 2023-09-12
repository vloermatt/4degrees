import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Game } from "~/utils/types";
import axios from "axios";
import { z } from "zod";

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
  updateTallyBoardScore: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // fetch latest scores from rubgby api and update the board in the db
      const response = await axios.get(
        `https://v1.rugby.api-sports.io/games?id=${input.id}`,
        {
          headers: {
            "x-apisports-key": env.RUGBY_API,
          },
        },
      );
      const game = response.data.response[0] as Game;
      return await ctx.prisma.tallyBoard.update({
        where: {
          id: input.id,
        },
        data: {
          homeScore: game.scores.home ?? 0,
          awayScore: game.scores.away ?? 0,
        },
      });
    }),
});
