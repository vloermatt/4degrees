import versus from "@animations/versus.json";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Lottie from "react-lottie";
import { api } from "~/utils/api";
import { Game } from "~/utils/types";
type Params = {
  country: string;
  season: string;
  league: string;
};
export default (): JSX.Element => {
  const router = useRouter();
  const { country, season, league } = router.query as Params;
  const gamesQuery = api.rugby.getGames.useQuery({
    leagueID: league ?? "",
    season: season ?? "",
    teamID: "467", // south africa
  });
  let games: Game[] = [];
  if (gamesQuery.data) {
    games = gamesQuery.data;
  }
  useEffect(() => {
    if (gamesQuery.error) {
      alert(gamesQuery.error);
    }
  }, [gamesQuery.error]);
  return (
    <>
      <div className="mb-5 flex">
        <h1 className="text-5xl font-semibold text-white">{country}</h1>
      </div>
      {gamesQuery.isLoading ? (
        <h1>loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-10">
          {games.map((game) => (
            <div>
              <div
                key={game.id}
                className="border-green-800-500 border-3 relative m-auto flex h-full w-full flex-col rounded border-solid bg-green-500 p-4 text-center shadow-lg shadow-green-700"
              >
                <div className="absolute -right-5 -top-5 h-[150px] w-[150px]  overflow-hidden before:absolute before:left-3 before:-z-[1] before:block before:border-[12px] before:border-orange-700 before:content-['']">
                  <div className=" relative right-12 top-10 w-[300px] rotate-45 bg-orange-500 p-2 text-center ">
                    <span>COMING UP!</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <img src={game.teams.home.logo} />
                  <div>
                    <Lottie
                      options={{
                        animationData: versus,
                        loop: false,
                        autoplay: true,
                      }}
                    />
                  </div>
                  <img src={game.teams.away.logo} />
                  <p className="text-4xl font-semibold">{game.scores.away}</p>
                  <div />
                  <p className="text-4xl font-semibold">{game.scores.home}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
