import { useEffect, useState } from "react";
import { AMADEUS_HOTEL_LIST_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import useGetBearerKey from "./useGetBearerKey";
import { store, useMst } from "store";

const useGetHotelList = async (
  latitude: number | string,
  longitude: number | string,
  radius: number
) => {
  const { fetchBearerKey } = useGetBearerKey();

  try {
    const bearerKey = await SecureStore.getItemAsync("Bearer");

    const fetchHotelList = await fetch(
      `${AMADEUS_HOTEL_LIST_URL}/reference-data/locations/hotels/by-geocode?latitude=${latitude}&longitude=${longitude}&radius=${radius}&radiusUnit=${store.unit.unit}&hotelSource=ALL`,

      {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
        },
      }
    );

    const statusCode = fetchHotelList.status;
    console.log(statusCode);

    if (statusCode === 401 || statusCode === 400) {
      throw new Error(`${statusCode}`);
    }

    const res = await fetchHotelList.json();
    const data = res.data;

    return { data };
  } catch (error) {
    console.log("error in catch");
  }
};

export default useGetHotelList;
