import { useEffect } from "react";
import { api } from "~/utils/api";
import { League } from "~/utils/types";

export default (): JSX.Element => {
  const leaguesQuery = api.rugby.getLeagues.useQuery({
    country: "World",
    season: "2023",
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
  return (
    <main className="min-h-screen flex-col bg-brand-300 p-10">
      <div className="flex">
        <h1>World Rugby Leagues</h1>
      </div>
      {leaguesQuery.isLoading ? (
        <h1>loading...</h1>
      ) : (
        <div className="grid grid-cols-5 gap-10">
          {leagues.map((league) => (
            <div
              key={league.id}
              className="m-auto h-full w-full rounded border-2 border-solid border-brand-500 bg-brand-500 p-4 shadow-lg shadow-cyan-500/50"
            >
              <p className="text-right font-semibold">
                {league.seasons[0]?.season}
              </p>
              <img src={league.logo} className="m-auto" />
              <p className="p-2 text-lg font-semibold">{league.name}</p>
              <button className="border-solidborder-brand-500 float-right rounded border-2 p-2 font-semibold hover:bg-brand-500 hover:text-white">
                View more
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
