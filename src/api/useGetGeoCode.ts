import { GOOGLE_API } from "@env";
import useGetHotelList from "./useGetHotelList";
import { HotelList } from "constants/types";
import { store } from "store";

const useGetGeoCode = async (location: string | undefined) => {
  try {
    console.log(location + " in geoCode");
    const fetchGeoCode = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_API}`
    );
    const results = await fetchGeoCode.json();
    const lat = results.results[0].geometry.location.lat;
    const lng = results.results[0].geometry.location.lng;

    const hotelList = await useGetHotelList(lat, lng, 3);

    const data = await hotelList?.data;

    store.searchDestination.setSearchDestination(
      results.results[0].address_components[0].long_name
    );

    return { data };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default useGetGeoCode;
