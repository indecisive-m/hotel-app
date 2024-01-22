import { types } from "mobx-state-tree";
import { Dates } from "models/Dates";
import { createContext, useContext } from "react";
import { CalendarUtils } from "react-native-calendars";

const RootStoreContext = createContext(null);

export const Provider = RootStoreContext.Provider;

const RootStore = types.model({
  dates: Dates,
});

export const store = RootStore.create({
  dates: {
    checkInDate: CalendarUtils.getCalendarDateString(new Date()),
  },
});

export function useMst() {
  const store = useContext(RootStoreContext);

  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
