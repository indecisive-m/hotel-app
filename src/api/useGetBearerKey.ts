import * as SecureStore from "expo-secure-store";
import { AMADEUS_API_KEY, AMADEUS_AUTH_URL, AMADEUS_API_SECRET } from "@env";

const useGetBearerKey = () => {
  const fetchBearerKey = async () => {
    try {
      const fetchBearerKey = await fetch(AMADEUS_AUTH_URL, {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`,
      });

      const res = await fetchBearerKey.json();

      await SecureStore.setItemAsync("Bearer", res.access_token);

      console.log(res.access_token);
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchBearerKey };
};

export default useGetBearerKey;
