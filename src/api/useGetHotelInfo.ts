import { AMADEUS_HOTEL_LIST_URL, GOOGLE_API } from "@env";
import * as SecureStore from "expo-secure-store";
import useGetBearerKey from "./useGetBearerKey";
import { store, useMst } from "store";
import { useQuery } from "react-query";

const fetchInfo = async (hotel: string) => {
  try {
    const bearerKey = await SecureStore.getItemAsync("Bearer");

    const fetchHotelInfo = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json
  ?fields=formatted_address%2Cname%2photos%2vicinity
  &input=${hotel}
  &inputtype=textquery
  &key=${GOOGLE_API}`
    );

    console.log(hotel);
    const statusCode = fetchHotelInfo.status;

    if (statusCode === 401 || statusCode === 400) {
      throw new Error(`${statusCode}`);
    }

    const data = await fetchHotelInfo.json();

    console.log(data);
    return { data };
  } catch (error) {
    console.log("error in catch hotel info");
  }
};

export const useGetHotelInfo = (hotel: string) => {
  return useQuery({
    queryKey: ["HotelInfo", hotel],
    queryFn: () => fetchInfo(hotel),
  });
};
