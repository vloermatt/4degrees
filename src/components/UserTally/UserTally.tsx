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
  const [message, setMessage] = useState("");

  const handleReplayAnimation = () => {
    setAnimationKey((val) => val + 1);
  };

  useEffect(() => {
    const channel = pusherClient.subscribe("tally");
    channel.bind(tally.id, function (data) {
      handleReplayAnimation();
      if (data.message) {
        setMessage(data.message);
      }
    });
  }, [tally]);

  const getClassByRank = (rank?: number) => {
    if (!rank) {
      return ["border-green-500/80"];
    }
    switch (rank) {
      case 1:
        return ["border-none bg-green-500"];
      case 2:
        return ["border-none bg-green-500/60"];
      case 3:
        return ["border-none bg-green-500/30"];
      default:
        return ["border-none border-green-500"];
    }
  };

  const getBorderClassByRank = (rank?: number) => {
    if (!rank) {
      return [""];
    }
    switch (rank) {
      case 1:
        return ["user-tally-border user-tally-border-gold"];
      case 2:
        return ["user-tally-border user-tally-border-silver"];
      case 3:
        return ["user-tally-border user-tally-border-bronze"];
      default:
        return [""];
    }
  };

  return (
    <div className="user-tally-container">
      <div
        className={clsx(twMerge(clsx("user-tally", ...getClassByRank(rank))))}
        key={animationKey}
      >
        <div>
          {rank ? (
            <div className="absolute right-0 top-0">
              <span className="bg-white-50 text-5xl">
                {rank === 1 ? <p>🥇</p> : null}
                {rank === 2 ? <p>🥈</p> : null}
                {rank === 3 ? <p>🥉</p> : null}
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
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
        {message ? (
          <div className="banter">
            <p>{message}</p>
          </div>
        ) : null}
      </div>
      <div className={clsx(twMerge(clsx(getBorderClassByRank(rank))))}></div>
    </div>
  );
};

export default UserTally;
