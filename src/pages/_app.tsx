"use client";
import { type AppType } from "next/app";
import { useRouter } from "next/router";
import NavBar from "~/components/NavBar";
import "~/styles/globals.css";
import { api } from "~/utils/api";
import { NAV_ROUTES } from "~/utils/constants";

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <main className="-z-10 min-h-screen flex-col bg-black-500">
      {NAV_ROUTES.filter((navRoute) => navRoute.hideNav).some((navRoute) =>
        router.route.includes(navRoute.path),
      ) ? (
        <></>
      ) : (
        <NavBar />
      )}
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
