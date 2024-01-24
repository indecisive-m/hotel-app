import { types } from "mobx-state-tree";

export const HotelModel = types
  .model({
    numberOfRooms: types.number,
    numberOfAdults: types.number,
  })
  .actions((self) => ({
    setNumberOfRooms(number: number) {
      self.numberOfRooms = number;
    },
    setNumberOfAdults(number: number) {
      self.numberOfAdults = number;
    },
  }));
