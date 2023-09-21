import { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingShip from "~/components/LoadingShip";
import { api } from "~/utils/api";
import { League } from "~/utils/types";

type Params = {
  country: string;
  season: string;
};
export default (): JSX.Element => {
  const router = useRouter();
  const { country, season } = router.query as Params;
  const leaguesQuery = api.rugby.getLeagues.useQuery({
    countryID: country ?? "",
    season: season ?? "",
  });
  let leagues: League[] = [];
  if (leaguesQuery.data) {
    leagues = leaguesQuery.data;
  }
  useEffect(() => {
    if (leaguesQuery.error) {
      alert(leaguesQuery.error);
    }
  }, [leaguesQuery.error]);

  const handleRoute = (leagueID: string) => {
    router.push(`/rugby/leagues/${country}/${season}/${leagueID}`);
  };
  return (
    <main className="m-auto flex min-h-screen w-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] p-5">
      {leaguesQuery.isLoading ? (
        <LoadingShip />
      ) : (
        <div className="grid grid-cols-5 gap-10">
          {leagues.map((league) => (
            <div
              key={league.id}
              className="border-green-800-500 border-3 m-auto flex h-full w-full flex-col rounded border-solid bg-green-500 p-4 shadow-lg shadow-green-700"
            >
              <p className="text-right font-semibold">
                {league.seasons && league.seasons[0]?.season}
              </p>
              <img src={league.logo} className="m-auto" />
              <p className="p-2 text-lg font-semibold">{league.name}</p>
              <div
                className="flex flex-col text-right"
                onClick={() => handleRoute(league.id.toString())}
              >
                <button className="rounded bg-orange-500 p-2 font-semibold shadow-md shadow-orange-700 hover:bg-orange-400">
                  View more
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
