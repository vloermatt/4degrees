import { Tally } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
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

  useEffect(() => {
    if (getTalliesQuery.data) {
      setTallies(getTalliesQuery.data);
    }
  }, [getTalliesQuery.data]);
  const [socket, setSocket] = useState<Socket>();
  const [socketConnected, setSocketConnected] = useState(false);

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

  return (
    <main>
      <h1>{gameId}</h1>
      <div className="m-auto grid w-screen grid-cols-10 gap-5 p-5">
        {tallies.map((tally) => (
          <UserTally key={tally.id} tally={tally} socket={socket} />
        ))}
      </div>
    </main>
  );
};
