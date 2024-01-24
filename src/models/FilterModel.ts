import { types } from "mobx-state-tree";

export const FilterModel = types
  .model({
    amenities: types.maybe(types.array(types.string)),
    rating: types.maybe(types.number),
  })
  .actions((self) => ({
    setRating(number: number) {
      self.rating = number;
    },
    setAmenities(item: string) {
      self.amenities?.push(item);
    },
  }));
