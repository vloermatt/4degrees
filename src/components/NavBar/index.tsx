import Link from "next/link";
import { NAV_ROUTES } from "~/utils/constants";
import logo from "../../assets/images/4degrees-compact.png";
import RugbyAPIUsage from "../RugbyAPIUsage";

export default (): JSX.Element => {
  return (
    <div className={`flex flex-row`}>
      <div className="m-auto basis-1/12 self-center transition delay-150 ease-in-out hover:scale-110">
        <Link href={"/"}>
          <img
            // todo - setup asset theme
            src={logo.src}
            className="w-3/5"
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
                className="hover:scale-110 hover:text-brand-400"
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
