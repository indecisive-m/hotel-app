import { AMADEUS_HOTEL_URL } from "@env";
import { Offers } from "constants/types";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";

function useGetHotelDetails() {
  const [hotelDetails, setHotelDetails] = useState<Offers>();

  const fetchHotelDetails = async (hotelId: String, adults: Number) => {
    const bearerKey = await SecureStore.getItemAsync("Bearer");
    try {
      const fetchHotelDetails = await fetch(
        `${AMADEUS_HOTEL_URL}hotelIds=${hotelId}&adults=${adults}&checkInDate=2024-01-20&checkOutDate=2024-01-27&roomQuantity=1&paymentPolicy=NONE&bestRateOnly=true`,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
          },
        }
      );

      const res = await fetchHotelDetails.json();

      console.log(res.data[0].offers[0]);
      setHotelDetails(res.data[0].offers[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchHotelDetails, hotelDetails };
}

export default useGetHotelDetails;
