"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { type AppType } from "next/app";
import NavBar from "~/components/NavBar";
import "~/styles/globals.css";
import theme from "~/theme";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <Flex flexDirection={"row"} minHeight={"100vh"} minWidth={"100vw"}>
          <NavBar />
          <Component {...pageProps} />
        </Flex>
      </ChakraProvider>
    </CacheProvider>
  );
};

export default api.withTRPC(MyApp);
