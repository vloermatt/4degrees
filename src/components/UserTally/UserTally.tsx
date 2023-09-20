import { Tally } from "@prisma/client";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { twMerge } from "tailwind-merge";
import { pusherClient } from "~/utils/pusher-client";

interface Props {
  tally: Tally;
  rank?: number;
  socket?: Socket;
}

const UserTally = ({ tally, socket, rank }: Props): JSX.Element => {
  const [animationKey, setAnimationKey] = useState<number>(0);

  const handleReplayAnimation = () => {
    console.log("replaying animation");
    setAnimationKey((val) => val + 1);
  };

  useEffect(() => {
    const channel = pusherClient.subscribe("tally");
    channel.bind(tally.id, function (data) {
      handleReplayAnimation();
    });
  }, []);

  const getClassByRank = (rank?: number) => {
    if (!rank) {
      return ["bg-green-500"];
    }
    switch (rank) {
      case 1:
        return ["bg-yellow-300"];
      case 2:
        return ["bg-gray-300"];
      case 3:
        return ["bg-amber-500"];
      default:
        return ["bg-green-500"];
    }
  };

  return (
    <div
      className={clsx(
        twMerge(
          clsx(
            "m-auto",
            "flex",
            "h-full",
            "w-full",
            "flex-col",
            "self-center",
            "rounded",
            ...getClassByRank(rank),
            "p-5",
            "text-center",
            "font-semibold",
            "shadow-lg",
            "border-2",
            "border-green-500",
          ),
        ),
      )}
    >
      <motion.div
        key={animationKey}
        animate={{
          //   scale: [1, 1.1, 1.1, 1.1, 1],
          rotate: [0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0],
          //   borderRadius: ["100%", "20%", "20%", "20%", "100%"],
        }}
        className="m-auto w-5/6 rounded-full bg-gradient-to-b from-brand-500 to-[#15162c]"
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: 0,
          repeatDelay: animationKey,
        }}
      >
        <img src={tally.avatar} />
      </motion.div>
      <p className="break-words">{tally.nickname}</p>
      <p>
        {tally.home} / {tally.away}
      </p>
    </div>
  );
};

export default UserTally;
