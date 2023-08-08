import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EAF3F5",
          100: "#D5E6EC",
          200: "#ABCDD9",
          300: "#81B4C5",
          400: "#579BB2",
          500: "#40798C",
          600: "#336170",
          700: "#264954",
          800: "#1A3038",
          900: "#0D181C",
          950: "#060C0E",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
