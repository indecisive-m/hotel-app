import { View, Text } from "react-native";
import React from "react";
import { GOOGLE_API } from "@env";

const useGetHotelPhotos = async (photoName: string) => {
  const url = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=500&maxWidthPx=500&skipHttpRedirect=true&key=${GOOGLE_API}`;

  const fetchPhotos = await fetch(url);

  const data = await fetchPhotos.json();

  //   console.log(data);

  return { data };
};

export default useGetHotelPhotos;
