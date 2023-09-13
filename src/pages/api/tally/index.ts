import { NextApiRequest } from "next";

export default (req: NextApiRequest, res) => {
  console.log("hit the tally!");
  if (req.method === "POST") {
    // get message
    const message = req.body;

    console.log("TALLY MESSAGE", message);
    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("tally", message);

    // return message
    res.status(201).json(message);
  }
};
