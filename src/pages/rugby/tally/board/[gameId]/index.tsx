import versus from "@animations/versus.json";
import { Tally } from "@prisma/client";
import { useRouter } from "next/router";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { Socket, io } from "socket.io-client";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";
import UserTally from "../UserTally";

type Params = {
  gameId: string;
};
export default (): JSX.Element => {
  const router = useRouter();
  const { gameId } = router.query as Params;
  const [tallies, setTallies] = useState<Tally[]>([]);
  const getTalliesQuery = api.tally.getTallies.useQuery({
    boardId: gameId,
  });
  const getTallyBoardQuery = api.tallyBoard.getTallyBoard.useQuery({
    id: gameId,
  });

  useEffect(() => {
    if (getTalliesQuery.data) {
      setTallies(getTalliesQuery.data);
    }
  }, [getTalliesQuery.data]);
  const [socket, setSocket] = useState<Socket>();
  const [socketConnected, setSocketConnected] = useState(false);
  const [scores, setScores] = useState({
    home: 0,
    away: 0,
  });
  const [rankedTallies, setRankedTallies] = useState<Tally[]>([]);

  const socketInitializer = async () => {
    console.log("attempting to connect...");
    const res = await fetch("/api/play");
    console.log({ res });
    const newSocket = io({
      path: "/api/play/",
    });
    setSocket(newSocket);
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  const rankTallies = () => {
    console.log("ranking tallies...");
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

  useEffect(() => {
    console.log("on tally!");
    socket?.on("tally", (tally) => setTallies((val) => [...val, tally]));
    socket?.on("disconnect", () => {
      setSocketConnected(false);
      console.log("disconnected...");
    });
    socket?.on("connect", () => {
      setSocketConnected(true);
      console.log("connected!");
    });
    socket?.on("connect_error", (err) => {
      console.log({ err });
    });
    socket?.on("tally-ho", ({ id }) => {
      console.log("tally-hooo", id);
      alert(id);
    });
  }, [socket?.on]);

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
    <main className="relative">
      <h1>{gameId}</h1>
      <div className="m-auto w-1/3">
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
          <div className="relative h-full space-y-2 self-center">
            <img src={getTallyBoardQuery.data?.away.logo ?? ""} />
          </div>
        </div>
        <div className="flex">
          <p className="w-1/2 text-center text-4xl font-semibold">
            {scores.home}
          </p>
          <p className="w-1/2 text-center text-4xl font-semibold">
            {scores.away}
          </p>
        </div>
      </div>
      <QRCodeCanvas
        className="absolute right-10 top-10"
        value={env.NEXT_PUBLIC_HOST + "/rugby/tally/board/" + gameId + "/play"}
      />
      <div className="m-auto grid w-screen grid-cols-10 gap-5 p-5">
        {tallies.map((tally) => (
          <UserTally
            key={tally.id}
            tally={tally}
            socket={socket}
            rank={
              rankedTallies.slice(0, 3).findIndex((t) => t.id === tally.id) + 1
            }
          />
        ))}
      </div>
    </main>
  );
};
