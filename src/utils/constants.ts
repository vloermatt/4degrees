import { NavRoute } from "./types";

export const NAV_ROUTES: NavRoute[] = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/rugby",
    title: "Rugby",
    onNav: true,
  },
  {
    path: "/dashboard",
    title: "Word of the day",
    onNav: true,
  },
  {
    path: "/rugby/tally",
    title: "Tackle & Tally",
    hideNav: true,
  },
];
