import { GOOGLE_API } from "@env";
import useGetHotelList from "./useGetHotelList";
import { HotelList } from "constants/types";

const useGetGeoCode = async (location: string) => {
  try {
    console.log(location + " in geoCode");
    const fetchGeoCode = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_API}`
    );
    const results = await fetchGeoCode.json();
    const lat = results.results[0].geometry.location.lat;
    const lng = results.results[0].geometry.location.lng;

    const hotelList = await useGetHotelList(lat, lng, 2);

    const data = await hotelList?.data;

    return { data };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default useGetGeoCode;
