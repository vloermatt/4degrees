import Link from "next/link";
import { NAV_ROUTES } from "~/utils/constants";
import logo from "../../assets/images/4degrees-compact.png";
import RugbyAPIUsage from "../RugbyAPIUsage";

export default (): JSX.Element => {
  return (
    <div className={`flex flex-row border-b-4 border-green-700 bg-green-500`}>
      <div className="m-auto basis-1/12 self-center ">
        <Link href={"/"}>
          <img
            // todo - setup asset theme
            src={logo.src}
            className="w-3/5 transition delay-150 ease-in-out hover:animate-spin-fast"
          />
        </Link>
      </div>
      <div
        className={`grid grid-flow-col auto-col-${NAV_ROUTES.length} w-1/2 self-center`}
      >
        {NAV_ROUTES.filter((navRoute) => navRoute.path !== "/").map(
          (navRoute) => (
            <div>
              <Link
                className="p-5 font-semibold hover:scale-110 hover:text-white"
                href={navRoute.path}
                key={navRoute.path}
              >
                <button>{navRoute.title}</button>
              </Link>
            </div>
          ),
        )}
      </div>
      <div className="m-auto">
        <RugbyAPIUsage />
      </div>
    </div>
  );
};
