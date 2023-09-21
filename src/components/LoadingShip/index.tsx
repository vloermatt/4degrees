import shipAmimation from "@animations/ship_loading.json";
import { motion } from "framer-motion";
import Lottie from "react-lottie";

const LoadingShip = (): JSX.Element => {
  return (
    <motion.div
      animate={{
        y: [0, 10, 0],
      }}
      className="m-auto w-1/6 rounded-full bg-gradient-to-b from-brand-300 to-brand-800"
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
      }}
    >
      <Lottie
        options={{
          animationData: shipAmimation,
          loop: true,
          autoplay: true,
        }}
      />
    </motion.div>
  );
};

export default LoadingShip;
