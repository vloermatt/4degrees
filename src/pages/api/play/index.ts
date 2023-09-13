import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //@ts-ignore
    if (res?.socket?.server?.io instanceof Server) {
      console.log("Socket is already running");
    } else {
      console.log("Socket is initializing");
      //@ts-ignore
      const io = new Server(res.socket.server, {
        path: "/api/play",
        cors: {
          origin: "http://localhost:3000",
        },
        addTrailingSlash: false,
      });
      console.log(io.path());
      //@ts-ignore
      res.socket.server.io = io;
    }
    res.end();
  } catch (err) {
    console.log("ERROR IN PLAY SOCKET", err);
  }
};

export default SocketHandler;
