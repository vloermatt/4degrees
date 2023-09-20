import Pusher from "pusher-js";
import { env } from "~/env.mjs";

// Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;
export const pusherClient = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: "eu",
});
