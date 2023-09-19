import { Server } from "socket.io";

const SocketHandler = (req: any, res: any) => {
  try {
    if (res.socket.server.io) {
      console.log("Socket is already running");
    } else {
      console.log("Socket is initializing");
      const io = new Server(res.socket.server, {
        path: "/api/play",
        addTrailingSlash: false,
        transports: ["websocket"],
      });
      console.log(io.path());
      res.socket.server.io = io;
    }
    res.end();
  } catch (err) {
    console.log("ERROR IN PLAY SOCKET", err);
  }
};

export default SocketHandler;
