// React Navigation Types

export type StackParamList = {
  Home: undefined;
  Hotel: { hotelId: string };
  HotelSearchMap: { hotelList: Object[] | undefined };
};

export type TabParamList = {
  Home: undefined;
  Settings: undefined;
};

// Hotel List API Types

export type GeoCode = {
  longitude: string;
  latitude: string;
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
