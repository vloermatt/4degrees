const { Server } = require("socket.io");

const SocketHandler = (req, res) => {
  try {
    if (res.socket.server.io) {
      console.log("Socket is already running");
    } else {
      console.log("Socket is initializing");
      const io = new Server(res.socket.server, {
        path: "/api/play",
        cors: {
          origin: "http://localhost:3000",
        },
        addTrailingSlash: false,
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
