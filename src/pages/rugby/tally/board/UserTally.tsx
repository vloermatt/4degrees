import { Tally } from "@prisma/client";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { twMerge } from "tailwind-merge";

interface Props {
  tally: Tally;
  rank?: number;
  socket?: Socket;
}

export default ({ tally, socket, rank }: Props): JSX.Element => {
  const [animationKey, setAnimationKey] = useState<number>(0);

  const handleReplayAnimation = () => {
    console.log("replaying animation");
    setAnimationKey((val) => val + 1);
  };

  useEffect(() => {
    socket?.on(tally.id, ({ id }) => {
      handleReplayAnimation();
    });
  }, [socket?.on]);

  const getColorByRank = (rank?: number) => {
    console.log(rank);
    if (!rank) {
      return "bg-green-500";
    }
    switch (rank) {
      case 1:
        return "bg-yellow-300";
      case 2:
        return "bg-gray-300";
      case 3:
        return "bg-amber-500";
    }
  };

  return (
    <div
      // className="m-auto flex h-full w-full flex-col self-center rounded bg-green-500 p-5 text-center font-semibold shadow-lg shadow-green-700"
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
            getColorByRank(rank),
            "p-5",
            "text-center",
            "font-semibold",
            "shadow-lg",
            "shadow-green-700",
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
        className="m-auto w-5/6 rounded-full bg-white"
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
      <p>{tally.nickname}</p>
      <p>
        {tally.home} / {tally.away}
      </p>
    </div>
  );
};
