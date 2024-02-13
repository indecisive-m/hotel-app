import { GOOGLE_API } from "@env";
import * as SecureStore from "expo-secure-store";
import { store, useMst } from "store";
import useGetHotelPhotos from "./useGetHotelPhotos";

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

    if (statusCode === 401 || statusCode === 400) {
      throw new Error(`${statusCode}` + "hello");
    }

    let photoUris: string[] = [];

    type photo = {
      name: string;
    };

    data.places[0].photos.map(async (photo: photo) => {
      const photoUri = await useGetHotelPhotos(photo.name);

      photoUris.push(photoUri.data.photoUri);
    });

    return { data, photoUris };
  } catch (error) {
    console.log("error in catch hotel info");
  }
};

export default useGetHotelInfo;
