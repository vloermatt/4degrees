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
    <div className="flex-col">
      <div className="flex">
        <h1>World Rugby Leagues</h1>
      </div>
      {leaguesQuery.isLoading ? (
        <h1>loading...</h1>
      ) : (
        <>
          {leagues.map((league) => (
            <div key={league.id} className="flex items-start">
              <div className="flex-row items-center">
                <img src={league.logo} />
                <h2>{league.name}</h2>
                <p className="ml-auto self-start font-semibold">
                  {league.seasons[0]?.season}
                </p>
              </div>
              <button>Show more</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
