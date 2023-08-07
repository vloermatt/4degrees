import { Box, Button, Divider, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { colors } from "~/theme/styles";
import { NAV_ROUTES } from "~/utils/constants";
import logo from "../../theme/assets/images/4degrees-compact.png";
import RugbyAPIUsage from "../RugbyAPIUsage";

export default (): JSX.Element => {
  return (
    <Flex
      padding={5}
      backgroundColor={colors.secondary[500]}
      flexDirection={"column"}
      width={"25%"}
    >
      <img
        // todo - setup asset theme
        src={logo.src}
      />
      {NAV_ROUTES.map((navRoute) => (
        <Box key={navRoute.path} margin={2}>
          <Link href={navRoute.path}>
            <Button width={"100%"}>{navRoute.title}</Button>
          </Link>
        </Box>
      ))}
      <Divider marginTop={5} marginBottom={5} borderColor={colors.brand[100]} />
      <RugbyAPIUsage />
    </Flex>
  );
};
