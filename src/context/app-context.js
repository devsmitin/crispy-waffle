import { createContext } from "react";

export const appData = {
  data: [],
  fname: "",
  desc: "",
  colors: {
    Red: 0,
    Green: 0,
    Blue: 0,
  },
  update: false,
};

export const AppContext = createContext();
