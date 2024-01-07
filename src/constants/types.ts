// React Navigation Types

import useGetRoomDetails from "api/useGetRoomDetails";

export type StackParamList = {
  Explore: undefined;
  Hotel: { hotelId: string };
  HotelSearchMap: { hotelList: Object[] | undefined };
  CalendarModal: undefined;
  Room: { roomId: string; bedType: string };
};

export type TabParamList = {
  Explore: undefined;
  Settings: undefined;
};

// Hotel List API Types

export type GeoCode = {
  longitude: string | number;
  latitude: string | number;
};

export type Distance = {
  value: string;
  unit: string;
};

export type Hotel = {
  name: string;
  hotelId: string;
  geoCode: GeoCode;
  distance: Distance;
};

export type HotelList = Hotel[];

// Hotel Details API Types

export type Description = {
  text: string;
};

export type TypeEstimated = {
  bedType: string;
  beds: string;
  category: string;
};

export type Room = {
  description: Description;
  typeEstimated: TypeEstimated;
};

export type Price = {
  currency: string;
  base: string;
  total: string;
};

export type Cancellations = {
  amount: string;
  deadline: string;
  description: Description;
  type: string;
};
export type Policies = {
  cancellations: Cancellations[];
  paymentType: string;
};

export type Offers = {
  id: string;
  room: Room;
  price: Price;
  policies: Policies;
};

export type OffersList = Offers[];
