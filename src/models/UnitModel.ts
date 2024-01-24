import { types } from "mobx-state-tree";

export const UnitModel = types
  .model({
    unit: types.union(types.literal("MILE"), types.literal("KM")),
  })
  .actions((self) => ({
    setUnit(unit: TUnit) {
      self.unit = unit;
    },
  }));

type TUnit = "MILE" | "KM";
