import { useWindowDimensions } from "react-native";

export default {
  light: {
    text: "rgb(7, 11, 29)",
    background: "rgb(247, 247, 247)",
    primary: "rgb(252, 128, 3)",
    secondary: "rgb(253, 204, 155)",
    accent: "rgb(0, 94, 255)",
  },

  dark: {
    text: "rgb(226, 230, 248)",
    background: "rgb(8, 8, 8)",
    primary: "rgb(252, 128, 3)",
    secondary: "rgb(100, 51, 2)",
    accent: "rgb(0, 94, 255)",
  },
};

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
