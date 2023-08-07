import { TRPCError } from "@trpc/server";
import axios from "axios";
import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Game, League } from "~/utils/types";

export const rugbyRouter = createTRPCRouter({
  getAPIUsage: publicProcedure.query(async ({ ctx }) => {
    try {
      const response = await axios.get(
        "https://v1.rugby.api-sports.io/status",
        {
          headers: {
            "x-apisports-key": env.RUGBY_API,
          },
        }
      );
      if (response.data.errors.requests) {
        return 100;
      }
      return (
        (response.data.response.requests.current /
          response.data.response.requests.limit_day) *
        100
      );
    } catch (err) {
      throw new TRPCError({
        message: String(err),
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
  getGames: publicProcedure
    .input(z.object({ leagueID: z.string(), season: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const response = await axios.get(
          `https://v1.rugby.api-sports.io/games?league=${input.leagueID}&season=${input.season}`,
          {
            headers: {
              "x-apisports-key": env.RUGBY_API,
            },
          }
        );
        return {
          // todo - verify that this in fact the response
          rugbyData: response.data.response as Game[],
        };
      } catch (err) {
        console.log("err", err);
      }
    }),
  getLeagues: publicProcedure
    .input(
      z.object({
        country: z.string(),
        season: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const response = await axios.get(
          `https://v1.rugby.api-sports.io/leagues?country=${input.country}&season=${input.season}`,
          {
            headers: {
              "x-apisports-key": env.RUGBY_API,
            },
          }
        );
        console.log(response.data);
        if (response.data.errors.requests) {
          throw new TRPCError({
            message: String(response.data.errors.requests),
            code: "INTERNAL_SERVER_ERROR",
          });
        }
        return response.data.response as League[];
      } catch (err) {
        throw new TRPCError({
          message: String(err),
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});