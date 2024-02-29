import { types } from "mobx-state-tree";

export const ThemeModel = types
  .model({
    theme: types.union(types.literal("light"), types.literal("dark")),
  })
  .actions((self) => ({
    setTheme(theme: TTheme) {
      self.theme = theme;
    },
  }));

type TTheme = "light" | "dark";
