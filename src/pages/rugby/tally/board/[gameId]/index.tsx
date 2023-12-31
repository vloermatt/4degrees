import versus from "@animations/versus.json";
import { Tally } from "@prisma/client";
import { useRouter } from "next/router";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";

import { pusherClient } from "~/utils/pusher-client";
import UserTally from "../../../../../components/UserTally/UserTally";

type Params = {
  gameId: string;
};
export default (): JSX.Element => {
  const router = useRouter();
  const { gameId } = router.query as Params;
  const [tallies, setTallies] = useState<Tally[]>([]);
  const [scores, setScores] = useState({
    home: 0,
    away: 0,
  });
  const [rankedTallies, setRankedTallies] = useState<Tally[]>([]);
  const getTalliesQuery = api.tally.getTallies.useQuery({
    boardId: gameId,
  });
  const getTallyBoardQuery = api.tallyBoard.getTallyBoard.useQuery({
    id: gameId,
  });
  const updateTallyBoardMutation =
    api.tallyBoard.updateTallyBoardScore.useMutation({
      onSuccess: (res) => {
        setScores({
          home: res.homeScore,
          away: res.awayScore,
        });
      },
    });

  useEffect(() => {
    if (getTalliesQuery.data) {
      setTallies(getTalliesQuery.data);
    }
  }, [getTalliesQuery.data]);

  const onTally = (tally: Tally) => {
    setTallies((tallies) =>
      tallies.some((item) => item.id === tally.id)
        ? tallies
        : [...tallies, tally],
    );
  };

  useEffect(() => {
    const channel = pusherClient.subscribe("rugby-tallies");
    channel.bind(gameId, function (data) {
      onTally(data);
    });
  }, [gameId]);

  const rankTallies = () => {
    const homeWinners = scores.home > scores.away;
    const winningTeam = homeWinners ? "home" : "away";
    const isDraw = scores.home === scores.away;
    const winningMargin = homeWinners
      ? Math.abs(scores.home - scores.away)
      : Math.abs(scores.away - scores.home);
    // add +5 points to tallies that guessed the correct winner
    let tallyList =
      tallies?.map((tally) => {
        const playerScore = homeWinners
          ? tally.home > tally.away
            ? 5 * tallies.length
            : 0
          : tally.away > tally.home
          ? 5 * tallies.length
          : 0;
        return {
          ...tally,
          score: playerScore,
        };
      }) ?? [];
    // group tallies by closest margin and add +4 x rank points
    // todo - sort deez
    Object.values(
      tallyList.reduce((acc: Record<string, typeof tallyList>, item) => {
        const margin = Math.abs(
          item[winningTeam] - scores[winningTeam === "home" ? "away" : "home"],
        );

        if (!acc[margin]) {
          acc[margin] = [];
        }
        //@ts-ignore
        acc[margin].push(item);
        return acc;
      }, {}),
    ).forEach((group, index) => {
      group.forEach((tally) => {
        tallyList = tallyList.map((t) => {
          if (t.id === tally.id) {
            return {
              ...t,
              score: t.score + 4 * (tallies.length - index + 1),
            };
          }
          return t;
        });
      });
    });
    // group tallies by closest margin to winner and add +3 x rank points
    Object.values(
      tallyList.reduce((acc: Record<string, typeof tallyList>, item) => {
        const difference = Math.abs(item[winningTeam] - scores[winningTeam]);

        if (!acc[difference]) {
          acc[difference] = [];
        }
        //@ts-ignore
        acc[difference].push(item);
        return acc;
      }, {}),
    ).forEach((group, index) => {
      group.forEach((tally) => {
        tallyList = tallyList.map((t) => {
          if (t.id === tally.id) {
            return {
              ...t,
              score: t.score + 3 * (tallies.length - index + 1),
            };
          }
          return t;
        });
      });
    });
    // group tallies by closest margin to loser and add +2 x rank points
    Object.values(
      tallyList.reduce((acc: Record<string, typeof tallyList>, item) => {
        const difference = Math.abs(
          item[winningTeam === "away" ? "away" : "home"] -
            scores[winningTeam === "away" ? "away" : "home"],
        );

        if (!acc[difference]) {
          acc[difference] = [];
        }
        //@ts-ignore
        acc[difference].push(item);
        return acc;
      }, {}),
    ).forEach((group, index) => {
      group.forEach((tally) => {
        tallyList = tallyList.map((t) => {
          if (t.id === tally.id) {
            return {
              ...t,
              score: t.score + 2 * (tallies.length - index + 1),
            };
          }
          return t;
        });
      });
    });
    return tallyList.sort((a, b) => b.score - a.score);
  };

  const handleRefreshScores = () => {
    updateTallyBoardMutation.mutate({
      id: gameId,
    });
  };

  useEffect(() => {
    if (getTallyBoardQuery.data) {
      setScores({
        home: getTallyBoardQuery.data.homeScore,
        away: getTallyBoardQuery.data.awayScore,
      });
    }
  }, [getTallyBoardQuery.data]);

  useEffect(() => {
    setRankedTallies(rankTallies());
  }, [tallies, scores]);

  return (
    <main className="relative min-h-screen bg-gradient-to-tl from-[#00419a] to-[#57be46]">
      <div className="p-2" />
      <div className="grid grid-cols-3">
        <div className="border-3 shadow-l bg-white/10 hover:bg-white/20 m-auto w-5/6 rounded border-solid border-green-800 p-4 text-white-50">
          <h1 className="text-3xl font-bold">How to play:</h1>
          <ul className="mt-3">
            <h1 className="text-2xl font-bold">- Scan the QR-Code to enter</h1>
            <h1 className="text-2xl font-bold">- Guess the scores</h1>
            <hr className="m-3 border-dotted" />
            <h1 className="text-center text-2xl font-bold">🏆 Prizes 🏆</h1>
            <div className="mt-2 grid grid-cols-3 text-center">
              <h1 className="text-2xl font-bold">Spot on!</h1>
              <h1 className="text-2xl font-bold">→</h1>
              <h1 className="text-2xl font-bold">R250 tab</h1>
            </div>
            <div className="grid grid-cols-3 text-center">
              <h1 className="text-2xl font-bold">1st</h1>
              <h1 className="text-2xl font-bold">→</h1>
              <h1 className="text-2xl font-bold">R150 tab</h1>
            </div>
            <div className="grid grid-cols-3 text-center">
              <h1 className="text-2xl font-bold">2nd</h1>
              <h1 className="text-2xl font-bold">→</h1>
              <h1 className="text-2xl font-bold">1 Pint</h1>
            </div>
            <div className="grid grid-cols-3 text-center">
              <h1 className="text-2xl font-bold">3rd</h1>
              <h1 className="text-2xl font-bold">→</h1>
              <h1 className="text-2xl font-bold">1/2 Pint</h1>
            </div>
          </ul>
        </div>
        <div className="border-green-800-500 border-3 m-auto flex h-[300px] w-full flex-col justify-between rounded border-solid bg-white-100 p-5 shadow-lg shadow-green-700">
          <div className="grid grid-cols-3">
            <div className="h-full space-y-2 self-center">
              <img src={getTallyBoardQuery.data?.home.logo ?? ""} />
            </div>
            <div>
              <Lottie
                options={{
                  animationData: versus,
                  loop: false,
                  autoplay: true,
                }}
              />
            </div>
            <div className="relative flex h-full items-center space-y-2">
              <img src={getTallyBoardQuery.data?.away.logo ?? ""} />
            </div>
          </div>
          <div className="mb-5 grid grid-cols-3 justify-between text-black-700">
            <p className="text-center text-4xl font-semibold">{scores.home}</p>
            <div className="m-auto flex w-full items-center">
              <button
                onClick={handleRefreshScores}
                className="m-auto rounded bg-green-500 p-2 font-semibold text-white-50 shadow-md shadow-green-700 hover:bg-green-400"
              >
                {updateTallyBoardMutation.isLoading
                  ? "Checking scores..."
                  : `Refresh Scores`}
              </button>
            </div>
            <p className="text-center text-4xl font-semibold">{scores.away}</p>
          </div>
        </div>
        <QRCodeCanvas
          value={
            env.NEXT_PUBLIC_HOST + "/rugby/tally/board/" + gameId + "/play"
          }
          className="m-auto"
          size={256}
        />
      </div>
      <div className="user-tally-wrapper">
        {tallies.map((tally) => (
          <UserTally
            key={tally.id}
            tally={tally}
            rank={
              rankedTallies.slice(0, 3).findIndex((t) => t.id === tally.id) + 1
            }
          />
        ))}
      </div>
    </main>
  );
};
