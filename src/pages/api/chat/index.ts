import { NextApiRequest } from "next";

export default (req: NextApiRequest, res) => {
  console.log("hit the chat");
  if (req.method === "POST") {
    // get message
    const message = req.body;

    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("message", message);

    // return message
    res.status(201).json(message);
  }
};
