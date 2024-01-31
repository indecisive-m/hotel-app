import { Instance, types } from "mobx-state-tree";
import { HotelModel } from "models/HotelModel";
import { UnitModel } from "models/UnitModel";
import { createContext, useContext } from "react";
import { CalendarUtils } from "react-native-calendars";
import { DatesModel } from "models/DatesModel";
import { FilterModel } from "models/FilterModel";
import { SearchDestinationModel } from "models/SearchDestinationModel";

const RootStore = types.model({
  dates: DatesModel,
  unit: UnitModel,
  hotel: HotelModel,
  filters: FilterModel,
  searchDestination: SearchDestinationModel,
});

export const store = RootStore.create({
  dates: {
    checkInDate: CalendarUtils.getCalendarDateString(new Date()),
  },
  unit: {
    unit: "MILE",
  },
  hotel: {
    numberOfRooms: 1,
    numberOfAdults: 1,
  },
  filters: {},
  searchDestination: {},
});

export type RootInstance = Instance<typeof RootStore>;

const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useMst() {
  const store = useContext(RootStoreContext);

  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
