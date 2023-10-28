import loaderboard from "@animations/leaderboard.json";
import sailor_walking from "@animations/sailor_walking.json";
import Lottie from "react-lottie";

export default (): JSX.Element => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="m-auto grid w-1/2 grid-cols-2 gap-10 p-10">
        <div className="flex flex-col rounded bg-green-500 p-5 shadow-lg shadow-green-700">
          <h2 className="text-white text-3xl font-semibold">Rugby Leagues</h2>
          <div className="m-auto w-1/2">
            <Lottie
              options={{
                animationData: loaderboard,
                loop: false,
                autoplay: true,
              }}
            />
          </div>
          <a
            href="rugby/leagues"
            className="rounded bg-brand-500 p-2 text-center font-semibold shadow-md shadow-brand-700 hover:bg-brand-400"
          >
            View more
          </a>
        </div>
        <div className="flex flex-col rounded bg-green-500 p-5 shadow-lg shadow-green-700">
          <h2 className="text-white text-3xl font-semibold">Tackle & Tally</h2>
          <div className="m-auto w-1/2">
            <Lottie
              options={{
                animationData: sailor_walking,
                loop: true,
                autoplay: true,
              }}
            />
          </div>
          <a
            href="rugby/tally/board"
            className="rounded bg-brand-500 p-2 text-center font-semibold shadow-md shadow-brand-700 hover:bg-brand-400"
          >
            View more
          </a>
        </div>
      </div>
    </main>
  );
};
