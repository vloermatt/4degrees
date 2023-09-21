import versus from "@animations/versus.json";
import { motion } from "framer-motion";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import Lottie from "react-lottie";
import LoadingShip from "~/components/LoadingShip";
import { api } from "~/utils/api";

export default (): JSX.Element => {
  const router = useRouter();
  const getTallyBoardsQuery = api.tallyBoard.getTallyBoards.useQuery({});
  const handleRoute = (id: string) => {
    router.push(`/rugby/tally/board/${id}`);
  };
  return (
    <div>
      <div className="m-auto flex min-h-screen w-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] p-5">
        {getTallyBoardsQuery.isLoading ? (
          <LoadingShip />
        ) : (
          <motion.div
            className="m-auto grid w-screen grid-cols-4 gap-5 p-5"
            animate={{
              x: 200,
            }}
          >
            {getTallyBoardsQuery.data?.map((tallyBoard) => (
              <div
                key={tallyBoard.id}
                className="border-green-800-500 border-3 relative m-auto flex w-full flex-col rounded border-solid bg-green-500 p-4 text-center shadow-lg shadow-green-700"
              >
                {DateTime.fromJSDate(tallyBoard.date) > DateTime.now() ? (
                  <div className="absolute -right-5 -top-5 h-[150px] w-[150px]  overflow-hidden before:absolute before:left-3 before:-z-[1] before:block before:border-[12px] before:border-orange-700 before:content-['']">
                    <div className=" relative right-12 top-10 w-[300px] rotate-45 bg-orange-500 p-2 text-center ">
                      <span>COMING UP!</span>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="grid grid-cols-3 items-center">
                  <img src={tallyBoard.home.logo} />
                  <div>
                    <Lottie
                      options={{
                        animationData: versus,
                        loop: false,
                        autoplay: true,
                      }}
                    />
                  </div>
                  <img src={tallyBoard.away.logo} />
                  <p className="text-4xl font-semibold">
                    {tallyBoard.homeScore}
                  </p>
                  <div />
                  <p className="text-4xl font-semibold">
                    {tallyBoard.awayScore}
                  </p>
                </div>
                <div className="text-lg font-semibold">
                  {DateTime.fromJSDate(tallyBoard.date).toLocaleString(
                    DateTime.DATE_MED_WITH_WEEKDAY,
                  )}
                </div>
                <button
                  onClick={() => {
                    handleRoute(tallyBoard.id);
                  }}
                  className="mt-5 rounded bg-orange-500 p-2 font-semibold shadow-md shadow-orange-700 hover:bg-orange-400"
                >
                  <p>View Tallies</p>
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
