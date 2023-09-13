import { NextApiRequest, NextApiResponse } from "next";
import { Server, Socket } from "socket.io";

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (
      //@ts-ignore
      (res.socket as Socket & { server: { io: Server | undefined } }).server.io
    ) {
      console.log("Socket is already running");
    } else {
      console.log("Socket is initializing");
      const io = new Server(
        //@ts-ignore
        (res.socket as Socket & { server: { io: Server | undefined } }).server,
      );

      (
        res.socket as Socket & { server: { io: Server | undefined } }
        //@ts-ignore
      ).server.io = io;
    }
    res.end();
  } catch (err) {
    console.log("ERROR IN SOCKET HANDLER", err);
  }
};

export default SocketHandler;
