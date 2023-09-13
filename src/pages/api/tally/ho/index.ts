import { NextApiRequest } from "next";

export default (req: NextApiRequest, res) => {
  if (req.method === "POST") {
    // get message
    const body = req.body;

    console.log("TALLY MESSAGE", body);
    // dispatch to channel "message"
    res?.socket?.server?.io?.emit(body.id, body);

    // return message
    res.status(201).json(body);
  }
};
