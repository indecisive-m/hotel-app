import { Instance, types } from "mobx-state-tree";

export const Unit = types
  .model({
    unit: types.union(types.literal("MILE"), types.literal("KM")),
  })
  .actions((self) => ({
    setUnit(unit: IUnit) {
      self.unit = unit;
    },
  }));

export type IUnit = "MILE" | "KM";
