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
    <main className="min-h-screen flex-col bg-black-500 p-10">
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
              className="border-green-800-500 border-3 m-auto flex h-full w-full flex-col rounded border-solid bg-green-500 p-4 shadow-lg shadow-green-700"
            >
              <p className="text-right font-semibold">
                {league.seasons[0]?.season}
              </p>
              <img src={league.logo} className="m-auto" />
              <p className="p-2 text-lg font-semibold">{league.name}</p>
              <div className="flex flex-col text-right">
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
