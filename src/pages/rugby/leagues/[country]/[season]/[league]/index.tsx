import versus from "@animations/versus.json";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import LoadingShip from "~/components/LoadingShip";
import ModalConfirmation from "~/components/ModalConfirmation";
import { api } from "~/utils/api";
import { Game } from "~/utils/types";

type Params = {
  country: string;
  season: string;
  league: string;
};
export default (): JSX.Element => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game>();
  const { country, season, league } = router.query as Params;
  const gamesQuery = api.rugby.getGames.useQuery({
    leagueID: league ?? "",
    season: season ?? "",
  });
  const getTallyBoards = api.tallyBoard.getTallyBoards.useQuery({
    leagueId: league ?? "",
  });

  const createTallyBoard = api.tallyBoard.createBoard.useMutation({
    onSuccess: (data) => {
      router.push(`/rugby/tally/board/${data.id}`);
    },
    onError: (error) => {
      console.log(error);
      alert("error creating board");
    },
  });
  const handleCreateBoard = (gameId: string) => {
    createTallyBoard.mutate({
      id: gameId,
      leagueId: league ?? "",
      leagueName: selectedGame?.league.name ?? "",
      leagueCountry: selectedGame?.league.country?.name ?? "",
      leagueLogo: selectedGame?.league.logo ?? "",
      leagueType: selectedGame?.league.type ?? "",
      season: selectedGame?.date
        ? DateTime.fromISO(selectedGame.date).year.toString()
        : "",
      open: true,
      home_id: selectedGame?.teams.home.id.toString() ?? "",
      home_name: selectedGame?.teams.home.name ?? "",
      home_logo: selectedGame?.teams.home.logo ?? "",
      away_name: selectedGame?.teams.away.name ?? "",
      away_id: selectedGame?.teams.away.id.toString() ?? "",
      away_logo: selectedGame?.teams.away.logo ?? "",
    });
  };
  let games: Game[] = [];
  if (gamesQuery.data) {
    games = gamesQuery.data;
  }
  useEffect(() => {
    if (gamesQuery.error) {
      alert(gamesQuery.error);
    }
  }, [gamesQuery.error]);

  const handleButton = (game: Game) => {
    if (
      getTallyBoards.data?.find(
        (tallyBoard) => tallyBoard.id === game.id.toString(),
      )
    ) {
      router.push(`/rugby/tally/board/${game.id}`);
    } else {
      // pop off the confirmation modal
      setSelectedGame(game);
      setShowModal(true);
    }
  };
  return (
    <div className="m-auto flex min-h-screen w-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] p-5">
      {gamesQuery.isLoading ? (
        <LoadingShip />
      ) : (
        <>
          <div className="mb-5 flex p-10">
            <img src={games[0]?.league.logo} className="h-[80px]" />
            <h1 className="text-white self-center text-5xl font-semibold">
              {games[0]?.league.name}
            </h1>
          </div>
          <div className="grid grid-cols-3 gap-10 p-10">
            {games.map((game) => (
              <div>
                <div
                  key={game.id}
                  className="border-green-800-500 border-3 relative m-auto flex h-full w-full flex-col rounded border-solid bg-green-500 p-4 text-center shadow-lg shadow-green-700"
                >
                  {DateTime.fromISO(game.date) > DateTime.now() ? (
                    <div className="absolute -right-5 -top-5 h-[150px] w-[150px]  overflow-hidden before:absolute before:left-3 before:-z-[1] before:block before:border-[12px] before:border-brand-700 before:content-['']">
                      <div className=" relative right-12 top-10 w-[300px] rotate-45 bg-brand-500 p-2 text-center ">
                        <span>COMING UP!</span>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
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
                    <p className="text-4xl font-semibold">{game.scores.home}</p>
                    <div />
                    <p className="text-4xl font-semibold">{game.scores.away}</p>
                  </div>
                  <div className="text-lg font-semibold">
                    {DateTime.fromISO(game.date).toLocaleString(
                      DateTime.DATE_MED_WITH_WEEKDAY,
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleButton(game);
                    }}
                    disabled={createTallyBoard.isLoading}
                    className="mt-5 rounded bg-brand-500 p-2 font-semibold shadow-md shadow-brand-700 hover:bg-brand-400"
                  >
                    <p>
                      {getTallyBoards.data?.find(
                        (tallyBoard) => tallyBoard.id === game.id.toString(),
                      )
                        ? `View Tallies`
                        : `Tally Time!`}
                    </p>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <ModalConfirmation
            showModal={showModal}
            setShowModal={setShowModal}
            title="Tally-Ho?"
            body="Are you sure you want to create a new tally board for this game?"
            yesText="Tally-Ho!"
            onYes={() => {
              if (selectedGame) {
                handleCreateBoard(selectedGame.id.toString());
              }
              setShowModal(false);
            }}
          />
        </>
      )}
    </div>
  );
};
