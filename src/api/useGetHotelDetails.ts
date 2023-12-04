import { AMADEUS_HOTEL_URL } from "@env";
import { OffersList } from "constants/types";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import useGetBearerKey from "./useGetBearerKey";

const useGetHotelDetails = async (
  hotelId: String,
  adults: Number,
  bestRate: boolean
) => {
  const bearerKey = await SecureStore.getItemAsync("Bearer");

  try {
    const fetchHotelDetails = await fetch(
      `${AMADEUS_HOTEL_URL}hotelIds=${hotelId}&adults=${adults}&roomQuantity=1&paymentPolicy=NONE&bestRateOnly=${bestRate}`,
      {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
        },
      }
    );

    const statusCode = fetchHotelDetails.status;
    console.log(statusCode);

    // if (statusCode === 401 || statusCode === 400) {
    //   throw new Error(`${statusCode}`);
    // }

    const results = await fetchHotelDetails.json();

    const data = results?.data[0]?.offers;
    const hotel = results?.data[0]?.hotel;

    return { data, hotel };
  } catch (error) {
    console.log("error in catch");
    throw new Error(`${error}`);
  }
};

export default useGetHotelDetails;
