import { AMADEUS_HOTEL_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import { store, useMst } from "store";

const useGetHotelDetails = async (hotelId: String, bestRate: boolean) => {
  const bearerKey = await SecureStore.getItemAsync("Bearer");

  const checkOutDate = store.dates.checkOutDate
    ? `&checkOutDate=${store.dates.checkOutDate}`
    : "";

  try {
    const fetchHotelDetails = await fetch(
      `${AMADEUS_HOTEL_URL}hotelIds=${hotelId}&adults=${store.hotel.numberOfAdults}&checkInDate=${store.dates.checkInDate}${checkOutDate}&roomQuantity=${store.hotel.numberOfRooms}&paymentPolicy=NONE&bestRateOnly=${bestRate}`,
      {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
        },
      }
    );

    const statusCode = fetchHotelDetails.status;
    console.log(statusCode);

    const results = await fetchHotelDetails.json();

    const data = results?.data[0]?.offers;
    const hotel = results?.data[0]?.hotel;
    store.hotel.setHotelName(hotel?.name);

    return { data, hotel };
  } catch (error) {
    console.log("error in catch");
    throw new Error(`${error}`);
  }
};

export default useGetHotelDetails;
