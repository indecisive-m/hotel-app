import { AMADEUS_HOTEL_LIST_URL, GOOGLE_API } from "@env";
import * as SecureStore from "expo-secure-store";
import useGetBearerKey from "./useGetBearerKey";
import { store, useMst } from "store";
import { useQuery } from "react-query";

const useGetHotelInfo = async () => {
  try {
    const hotelName = store.hotel.hotelName;

    const bearerKey = await SecureStore.getItemAsync("Bearer");

    const hotelInfo = new URLSearchParams({
      textQuery: "London Harriott",
    });

    const body = { textQuery: hotelName };

    const encodedForm: {
      key: string;
      value: string;
    }[] = [];

    Object.entries(body).forEach(([key, value]) => {
      const encodedKey: string = encodeURIComponent(key);
      const encodedValue: string = encodeURIComponent(value);
      encodedForm.push(`${encodedKey}=${encodedValue}`);
    });

    const bodyForm = encodedForm.join("&");

    console.log(bodyForm);

    const fetchHotelInfo = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Goog-Api-Key": `${GOOGLE_API}`,
          "X-Goog-FieldMask":
            "places.accessibilityOptions,places.formattedAddress,places.photos,places.types",
        },
        body: bodyForm,
      }
    );
    console.log(store.hotel.hotelName);
    const statusCode = fetchHotelInfo.status;
    const data = await fetchHotelInfo.json();
    console.log(data.status);

    console.log(data);
    if (statusCode === 401 || statusCode === 400) {
      throw new Error(`${statusCode}` + "hello");
    }

    console.log(data.places[0].accessibilityOptions);
    console.log(data.places[0].formattedAddress);
    console.log(data.places[0].photos);
    console.log(data.places[0].types);

    return { data };
  } catch (error) {
    console.log("error in catch hotel info");
  }
};

export default useGetHotelInfo;

// export const useGetHotelInfo = () => {
//   return useQuery({
//     queryKey: ["HotelInfo"],
//     queryFn: () => fetchInfo(),
//   });
// };
