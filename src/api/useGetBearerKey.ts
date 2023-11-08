import React from "react";
import { AMADEUS_API_KEY, AMADEUS_AUTH_URL, AMADEUS_API_SECRET } from "@env";

const useGetBearerKey = async () => {
  try {
    const get = await fetch(AMADEUS_AUTH_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`,
    });

    const res = await get.json();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export default useGetBearerKey;
