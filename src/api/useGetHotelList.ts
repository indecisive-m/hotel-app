import { useState } from "react";
import { AMADEUS_HOTEL_LIST_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import useGetBearerKey from "./useGetBearerKey";

const useGetHotelList = async (
  latitude: Number,
  longitude: Number,
  radius: Number
) => {
  // const [hotelList, setHotelList] = useState<HotelList>([]);
  const { fetchBearerKey } = useGetBearerKey();
  try {
    const bearerKey = await SecureStore.getItemAsync("Bearer");

    const fetchHotelList = await fetch(
      `${AMADEUS_HOTEL_LIST_URL}/reference-data/locations/hotels/by-geocode?latitude=${latitude}&longitude=${longitude}&radius=${radius}&radiusUnit=MILE&hotelSource=ALL`,
      {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
        },
      }
    );

    const statusCode = fetchHotelList.status;
    const res = await fetchHotelList.json();
    console.log(statusCode);

    const data = res.data;

    return { data };
  } catch (error) {
    console.log(error);
  }
};

export default useGetHotelList;
