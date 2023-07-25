"use client";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import theme from "~/theme";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </CacheProvider>
  );
};

export default api.withTRPC(MyApp);
