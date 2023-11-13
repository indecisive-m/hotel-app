// React Navigation Types

export type StackParamList = {
  Home: undefined;
  Hotel: { hotelId: String };
};

export type TabParamList = {
  Home: undefined;
  Settings: undefined;
};

// Hotel List API Types

export type GeoCode = {
  longitude: String;
  latitude: String;
};

export type Distance = {
  value: String;
  unit: String;
};

export type Hotel = {
  name: String;
  hotelId: String;
  geoCode: GeoCode;
  distance: Distance;
};

export type HotelList = Hotel[];

// Hotel Details API Types

export type Description = {
  text: String;
};

export type TypeEstimated = {
  bedType: String;
  beds: String;
  category: String;
};

export type Room = {
  description: Description;
  typeEstimated: TypeEstimated;
};

export type Price = {
  currency: String;
  base: String;
  total: String;
};

export type Cancellations = {
  amount: String;
  deadline: String;
  description: Description;
  type: String;
};
export type Policies = {
  cancellations: Cancellations[];
  paymentType: String;
};

export type Offers = {
  id: String;
  room: Room;
  price: Price;
  policies: Policies;
};

export type OffersList = Offers[];
