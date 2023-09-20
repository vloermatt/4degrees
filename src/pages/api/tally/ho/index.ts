import { NextApiRequest } from "next";
import { pusher } from "~/utils/pusher";

export default (req: NextApiRequest, res) => {
  if (req.method === "POST") {
    // get message
    const body = req.body;
    console.log(body.id);
    pusher.trigger("tally", body.id, body);
    // return message
    res.status(201).json(body);
  }
};
