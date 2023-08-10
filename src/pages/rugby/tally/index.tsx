import versus from "@animations/versus.json";
import { Tally } from "@prisma/client";
import { Formik } from "formik";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import { api } from "~/utils/api";

export default (): JSX.Element => {
  const createTallyMutation = api.tally.createTally.useMutation();
  const handleCreate = (values: Omit<Tally, "id">) => {
    createTallyMutation.mutate({
      ...values,
    });
  };
  return (
    <main className="flex h-screen">
      <div className="m-auto flex w-screen flex-col self-center rounded bg-green-500 p-5 shadow-lg shadow-green-700">
        <Formik
          initialValues={{
            nickname: "",
            avatar: "",
            home: 0,
            away: 0,
          }}
          onSubmit={handleCreate}
        >
          {({ handleChange, values, handleSubmit }) => (
            <form className="flex flex-col space-y-2 p-5 pb-20 pt-20">
              {createTallyMutation.isLoading || createTallyMutation.data ? (
                <>
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1.5, 1.5, 1],
                      rotate: [0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0],
                      borderRadius: ["100%", "20%", "20%", "20%", "100%"],
                      opacity: [0, "100%", "100%", "100%", "100%"],
                    }}
                    className="m-auto w-1/2 bg-white"
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
                    <p>
                      Fingers crossed {createTallyMutation.data?.nickname} 🤞
                    </p>
                    <p>
                      Your tally should now be visible on the beeg screen 😎
                    </p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      className="mt-5 rounded bg-orange-500 p-2 text-center font-semibold shadow-md shadow-orange-700 hover:bg-orange-400"
                    >
                      Let's Gooo!
                    </button>
                  </motion.div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-3">
                    <div className="h-full space-y-2 self-center">
                      <img src={"https://media-3.api-sports.io/flags/za.svg"} />
                      <label className="font-semibold">Home</label>
                      <input
                        name="home"
                        type="number"
                        onChange={handleChange}
                        placeholder="22"
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
                      <img src={"https://media-3.api-sports.io/flags/gb.svg"} />
                      <label className="font-semibold">Away</label>
                      <input
                        name="away"
                        type="number"
                        onChange={handleChange}
                        placeholder={"14"}
                        className="h-8 w-full self-center rounded p-2 text-center"
                      />
                    </div>
                  </div>
                  <label className="font-semibold">Nickname</label>
                  <input
                    name="nickname"
                    onChange={handleChange}
                    placeholder="Beeg Mike"
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
      </div>
    </main>
  );
};
