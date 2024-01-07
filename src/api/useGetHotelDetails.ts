import { AMADEUS_HOTEL_URL } from "@env";
import * as SecureStore from "expo-secure-store";

const useGetHotelDetails = async (
  hotelId: String,
  adults: Number,
  bestRate: boolean,
) => {
  const bearerKey = await SecureStore.getItemAsync("Bearer");

  try {
    const fetchHotelDetails = await fetch(
      `${AMADEUS_HOTEL_URL}hotelIds=${hotelId}&adults=${adults}&roomQuantity=1&paymentPolicy=NONE&bestRateOnly=${bestRate}`,
      {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
        },
      },
    );

    const statusCode = fetchHotelDetails.status;
    console.log(statusCode);

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
