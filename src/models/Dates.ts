import { types } from "mobx-state-tree";

export const Dates = types
  .model({
    checkInDate: types.string,
    checkOutDate: types.maybe(types.string),
  })
  .actions((self) => ({
    setCheckInDate(newDate: string) {
      self.checkInDate = newDate;
      console.log(self.checkInDate + "checkin");
    },
    setCheckOutDate(newDate: string) {
      self.checkOutDate = newDate;
      console.log(self.checkOutDate + "checkout");
    },
  }));
