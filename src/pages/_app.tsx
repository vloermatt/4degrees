"use client";
import { type AppType } from "next/app";
import NavBar from "~/components/NavBar";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className="min-h-screen flex-col bg-black-500">
      <NavBar />
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
