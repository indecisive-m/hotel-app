import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { store } from "store";
import { ThemeContext } from "./context";

export const roomSize = /\d\d[s][q][m]/gim;

export const fontSize = {
  micro: 4,
  tiny: 8,
  extraSmall: 12,
  small: 16,
  medium: 20,
  large: 24,
  extraLarge: 30,
  huge: 40,
  massive: 52,
};

export const spacing = {
  micro: 2,
  tiny: 4,
  extraSmall: 8,
  small: 12,
  medium: 16,
  large: 24,
  extraLarge: 32,
  huge: 48,
  massive: 64,
};

export const borderRadius = {
  small: 5,
  medium: 10,
  large: 15,
  extraLarge: 20,
  circle: 9999,
};

export const lightTheme = {
  primary: "orange",
  secondary: "white",
  neutral: "#fff8f0",
  accent: "#ffa500",
  font: "#110000",
};

export const darkTheme = {
  primary: "#1d004e",
  secondary: "#3b3645",
  neutral: "#130C1C",
  accent: "#9d88b2",
  font: "#e5def2",
};
