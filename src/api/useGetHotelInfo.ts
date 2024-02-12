import { GOOGLE_API } from "@env";
import * as SecureStore from "expo-secure-store";
import { store, useMst } from "store";

const useGetHotelInfo = async () => {
  try {
    const hotelName = store.hotel.hotelName;

    const bearerKey = await SecureStore.getItemAsync("Bearer");

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
            "places.accessibilityOptions,places.formattedAddress,places.photos,places.allowsDogs,places.rating,places.userRatingCount,places.internationalPhoneNumber,places.editorialSummary",
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

    // console.log(data.places[0].accessibilityOptions);
    // console.log(data.places[0].formattedAddress);
    // console.log(data.places[0].photos);
    // console.log(data.places[0].allowsDogs);
    // console.log(data.places[0].rating);
    // console.log(data.places[0].userRatingCount);
    // console.log(data.places[0].internationPhoneNumber);
    // console.log(data.places[0].editorialSummary);

    return { data };
  } catch (error) {
    console.log("error in catch hotel info");
  }
};

export default useGetHotelInfo;
