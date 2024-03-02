import { createContext } from "react";

type Theme = {
  theme: "light" | "dark";
  setTheme: () => void;
};

export const ThemeContext = createContext<Theme>({
  theme: "light",
  setTheme: () => {},
});
