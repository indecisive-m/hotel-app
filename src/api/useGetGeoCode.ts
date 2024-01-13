import { GOOGLE_API } from "@env";
import useGetHotelList from "./useGetHotelList";
import { useNavigation } from "@react-navigation/native";

const useGetGeoCode = async (location: string) => {
  try {
    const navigation = useNavigation();
    console.log(location);
    const fetchGeoCode = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_API}`,
    );
    const results = await fetchGeoCode.json();
    const lat = results.results[0].geometry.location.lat;
    const lng = results.results[0].geometry.location.lng;

    const hotelList = new Promise((resolve, reject) =>
      resolve(useGetHotelList(lat, lng, 2)),
    );

    hotelList.then((value) =>
      navigation.navigate("HotelSearchMap", { hotelList: value.data }),
    );

    return { data };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default useGetGeoCode;
