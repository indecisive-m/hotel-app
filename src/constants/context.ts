import { createContext } from "react";

type Theme = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

export const ThemeContext = createContext<Theme>({
  theme: "light",
  setTheme: () => {},
});
