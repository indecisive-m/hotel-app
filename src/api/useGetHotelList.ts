import { useState } from "react";
import { AMADEUS_HOTEL_LIST_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import { HotelList } from "constants/types";
import useGetBearerKey from "./useGetBearerKey";

function useGetHotelList() {
  const [hotelList, setHotelList] = useState<HotelList>([]);
  const { fetchBearerKey } = useGetBearerKey();

  const fetchHotelList = async (
    latitude: Number,
    longitude: Number,
    radius: Number
  ) => {
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

      const res = await fetchHotelList.json();
      const statusCode = fetchHotelList.status;
      console.log(statusCode);

      if (statusCode === 401 || statusCode === 400) {
        console.log("error");
        fetchBearerKey();
        useGetHotelList();
      }

      setHotelList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchHotelList, hotelList };
}

export default useGetHotelList;
