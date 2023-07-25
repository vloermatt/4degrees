import { extendTheme } from "@chakra-ui/react";
// import { animations } from './assets/animations'
// import { images } from './assets/images'
import components from "./components";
import config from "./config";
import { colors, textStyles } from "./styles";
import styles from "./styles/styles";

const theme = extendTheme({
  colors,
  config,
  components,
  textStyles,
  styles,
});

export default theme;

// export { animations, images }
