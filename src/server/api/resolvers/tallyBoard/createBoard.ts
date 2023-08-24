import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { z } from "zod";
import CreateBoardSchema from "../../schemas/CreateBoardSchema";

export default async ({
  ctx,
  input,
}: {
  ctx: {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  };
  input: z.infer<typeof CreateBoardSchema>;
}) => {
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
  const league = await ctx.prisma.league.findUnique({
    where: {
      id: input.leagueId,
    },
  });
  if (!league) {
    await ctx.prisma.league.create({
      data: {
        id: input.leagueId,
        name: input.leagueName,
        type: input.leagueType,
        logo: input.leagueLogo,
        countryName: input.leagueCountry,
        season: input.season,
      },
    });
  }
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
};
