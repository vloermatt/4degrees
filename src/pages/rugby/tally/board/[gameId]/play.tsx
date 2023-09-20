import versus from "@animations/versus.json";
import { Tally } from "@prisma/client";
import clsx from "clsx";
import { Formik } from "formik";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { twMerge } from "tailwind-merge";
import { api } from "~/utils/api";

type Params = {
  gameId: string;
};
export default (): JSX.Element => {
  const router = useRouter();
  const { gameId } = router.query as Params;

  const [tallyId, setTallyId] = useState<string | null>();
  const [animationKey, setAnimationKey] = useState(0);

  const handleReplayAnimation = () => {
    setAnimationKey((val) => val + 1);
  };

  useEffect(() => {
    if (typeof window !== undefined && window.localStorage) {
      const game_id_tally_id = localStorage.getItem(`${gameId}_tally_id`);
      if (game_id_tally_id) {
        setTallyId(game_id_tally_id?.split("_")[1]);
      }
    }
  }, [gameId]);

  const getTallyBoardQuery = api.tallyBoard.getTallyBoard.useQuery({
    id: gameId,
  });

  const getTallyQuery = api.tally.getTally.useQuery({
    id: tallyId ?? "",
  });

  const createTallyMutation = api.tally.createTally.useMutation({
    onSuccess: (res) => {
      localStorage.setItem(`${gameId}_tally_id`, `${gameId}_${res.id}`);
      setTallyId(res.id);
    },
  });
  const shakeTallyMutation = api.tally.shake.useMutation({});
  const handleCreate = (values: Omit<Tally, "id">) => {
    createTallyMutation.mutate({
      ...values,
      avatar: `https://api.dicebear.com/6.x/croodles/svg?seed=${values.nickname}`,
      boardId: gameId,
    });
  };
  const onLetsGo = async () => {
    shakeTallyMutation.mutate({
      id: tallyId ?? "",
    });
    handleReplayAnimation();
  };
  return (
    <main className="flex h-screen">
      <div className="m-auto flex h-screen w-screen flex-col self-center rounded bg-green-500 shadow-lg shadow-green-700">
        {getTallyQuery.isLoading ? (
          <>LOADING...</>
        ) : (
          <Formik
            initialValues={{
              nickname: getTallyQuery.data?.nickname ?? "",
              avatar: getTallyQuery.data?.avatar ?? "",
              home: getTallyQuery.data?.home ?? 0,
              away: getTallyQuery.data?.away ?? 0,
              boardId: gameId,
            }}
            onSubmit={handleCreate}
          >
            {({ handleChange, values, handleSubmit }) => (
              <form className="m-auto flex flex-col space-y-2 p-5">
                {createTallyMutation.isLoading ||
                createTallyMutation.data ||
                getTallyQuery.data ? (
                  <>
                    <motion.div
                      key={animationKey}
                      animate={{
                        scale: animationKey === 0 ? [1, 1.5, 1.5, 1.5, 1] : 1,
                        rotate: [0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0],
                        borderRadius:
                          animationKey === 0
                            ? ["100%", "20%", "20%", "20%", "100%"]
                            : [],
                        opacity:
                          animationKey === 0
                            ? [0, "100%", "100%", "100%", "100%"]
                            : "100%",
                      }}
                      // className="m-auto w-1/2 bg-white"
                      className={clsx(
                        twMerge(
                          clsx(
                            "m-auto",
                            "w-1/2",
                            "bg-white",
                            animationKey !== 0 && "rounded-full",
                          ),
                        ),
                      )}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeatDelay: 1,
                      }}
                    >
                      {/* <div className="m-auto w-1/2 rounded-full bg-white"> */}
                      <img
                        src={`https://api.dicebear.com/6.x/croodles/svg?seed=${values.nickname}`}
                      />
                      {/* </div> */}
                    </motion.div>
                    <motion.div
                      animate={{
                        opacity: [0, "100%"],
                        x: [-200, 0],
                      }}
                      transition={{
                        delay: 2,
                      }}
                      className="text-center text-white"
                    >
                      <p>Fingers crossed {values.nickname} 🤞</p>
                      <p>
                        Your tally should now be visible on the beeg screen 😎
                      </p>
                      <div className="mt-10 grid grid-cols-3">
                        <div className="h-full space-y-2 self-center">
                          <img src={getTallyBoardQuery.data?.home.logo ?? ""} />
                          <label className="font-semibold">
                            {getTallyBoardQuery.data?.home.name ?? "Home"}
                          </label>
                          <p className="text-4xl font-semibold">
                            {values.home}
                          </p>
                        </div>
                        <div>
                          <Lottie
                            options={{
                              animationData: versus,
                              loop: false,
                              autoplay: true,
                            }}
                          />
                        </div>
                        <div className="h-full space-y-2 self-center">
                          <img src={getTallyBoardQuery.data?.away.logo ?? ""} />
                          <label className="font-semibold">
                            {getTallyBoardQuery.data?.away.name ?? "Away"}
                          </label>
                          <p className="text-4xl font-semibold">
                            {values.away}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          onLetsGo();
                        }}
                        className="mt-5 w-full rounded bg-orange-500 p-2 text-center font-semibold shadow-md shadow-orange-700 hover:bg-orange-400"
                      >
                        Let's Gooo!
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-3">
                      <div className="h-full space-y-2 self-center">
                        <img src={getTallyBoardQuery.data?.home.logo ?? ""} />
                        <label className="font-semibold">
                          {getTallyBoardQuery.data?.home.name ?? "Home"}
                        </label>
                        <input
                          name="home"
                          type="number"
                          onChange={handleChange}
                          className="h-8 w-full self-center rounded p-2 text-center"
                        />
                      </div>
                      <div>
                        <Lottie
                          options={{
                            animationData: versus,
                            loop: false,
                            autoplay: true,
                          }}
                        />
                      </div>
                      <div className="h-full space-y-2 self-center">
                        <img src={getTallyBoardQuery.data?.away.logo ?? ""} />
                        <label className="font-semibold">
                          {getTallyBoardQuery.data?.away.name ?? "Away"}
                        </label>
                        <input
                          name="away"
                          type="number"
                          onChange={handleChange}
                          className="h-8 w-full self-center rounded p-2 text-center"
                        />
                      </div>
                    </div>
                    <label className="font-semibold">Nickname</label>
                    <input
                      name="nickname"
                      onChange={handleChange}
                      className="h-8 rounded p-2"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      className="rounded bg-orange-500 p-2 text-center font-semibold shadow-md shadow-orange-700 hover:bg-orange-400"
                    >
                      Let's Go!
                    </button>
                  </>
                )}
              </form>
            )}
          </Formik>
        )}
      </div>
    </main>
  );
};
