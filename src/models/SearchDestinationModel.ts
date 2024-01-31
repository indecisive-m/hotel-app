import { types } from "mobx-state-tree";

export const SearchDestinationModel = types
  .model({
    searchDestination: types.maybe(types.string),
  })
  .actions((self) => ({
    setSearchDestination(newDestination: string) {
      self.searchDestination = newDestination;
    },
  }));
