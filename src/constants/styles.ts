import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import { store } from "store";

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

const theme = store.theme.theme;
export let colors: any;

observable(
  theme === "dark"
    ? (colors = {
        accent400: "blue",
      })
    : (colors = {
        accent400: "orange",
      })
);

// if (theme === "light") {
//   colors = {
//     accent400: "orange",
//   };
// }
