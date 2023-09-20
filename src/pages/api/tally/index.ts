import { NextApiRequest, NextApiResponse } from "next";
import { pusher } from "~/utils/pusher";

export const handler = (req: NextApiRequest, res: NextApiResponse) => {
  pusher.trigger("my-channel", "my-event", {
    message: "hello world",
  });
  res.status(200);
};

export default handler;
