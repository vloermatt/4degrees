import { z } from "zod";

export const CreateBoardSchema = z.object({
  id: z.string(),
  leagueId: z.string(),
  leagueName: z.string(),
  leagueType: z.string(),
  leagueLogo: z.string(),
  leagueCountry: z.string(),
  season: z.string(),
  open: z.boolean(),
  home_id: z.string(),
  home_name: z.string(),
  home_logo: z.string(),
  away_id: z.string(),
  away_name: z.string(),
  away_logo: z.string(),
});

export default CreateBoardSchema;
