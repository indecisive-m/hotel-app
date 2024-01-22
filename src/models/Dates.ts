import { types } from "mobx-state-tree";

export const Dates = types
  .model({
    checkInDate: types.string,
    checkOutDate: types.maybe(types.string),
  })
  .actions((self) => ({
    setCheckInDate(newDate: string) {
      self.checkInDate = newDate;
    },
    setCheckOutDate(newDate: string) {
      self.checkOutDate = newDate;
    },
  }));
