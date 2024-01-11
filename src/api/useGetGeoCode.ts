import { GOOGLE_API } from "@env";
const useGetGeoCode = async ({ location }: string) => {
  try {
    console.log(location);
    const fetchGeoCode = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_API}`,
    );
    const results = await fetchGeoCode.json();

    console.log(results);
    console.log("here?");

    return {};
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default useGetGeoCode;
