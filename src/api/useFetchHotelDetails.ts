import { AMADEUS_HOTEL_URL } from "@env";
import { OffersList } from "constants/types";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import useGetBearerKey from "./useGetBearerKey";

const useFetchHotelDetails = async (hotelId: String, adults: Number) => {
  const bearerKey = await SecureStore.getItemAsync("Bearer");

  try {
    const fetchHotelDetails = await fetch(
      `${AMADEUS_HOTEL_URL}hotelIds=${hotelId}&adults=${adults}&checkInDate=2023-11-14&roomQuantity=1&paymentPolicy=NONE&bestRateOnly=true`,
      {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
        },
      }
    );

    // console.log(res.data[0]);

    const status = fetchHotelDetails.status;
    console.log(status);

    const results = await fetchHotelDetails.json();

    return { results };
    //   console.log(res.data[0].offers[0].policies);
    //   setHotelDetails(res.data[0].offers[0]);
  } catch (error) {
    console.log(error);
  }
};

export default useFetchHotelDetails;
