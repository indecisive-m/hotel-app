import { AMADEUS_ROOM_URL } from "@env";
import { OffersList } from "constants/types";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import useGetBearerKey from "./useGetBearerKey";

const useGetRoomDetails = async (roomId: string) => {
  const bearerKey = await SecureStore.getItemAsync("Bearer");

  try {
    const fetchRoomDetails = await fetch(`${AMADEUS_ROOM_URL}${roomId}`, {
      headers: {
        Authorization: `Bearer ${bearerKey}`,
      },
    });

    const statusCode = fetchRoomDetails.status;
    console.log(statusCode);

    // if (statusCode === 401 || statusCode === 400) {
    //   throw new Error(`${statusCode}`);
    // }

    const results = await fetchRoomDetails.json();
    const data = results?.data?.offers;

    const room = results?.data?.hotel;

    return { data, room };
  } catch (error) {
    console.log("error in catch");
    throw new Error(`${error}`);
  }
};

export default useGetRoomDetails;
