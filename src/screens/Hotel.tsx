import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList, OffersList, Offers } from "../constants/types";
import useGetHotelDetails from "api/useGetHotelDetails";

type Props = NativeStackScreenProps<StackParamList, "Hotel">;

const Hotel = ({ route, navigation }: Props) => {
  const { fetchHotelDetails, hotelDetails } = useGetHotelDetails();
  const [offers, setOffers] = useState<Offers>();
  const { hotelId } = route.params;

  useEffect(() => {
    console.log("UseEffect");
  }, [navigation]);

  return (
    <View>
      <Text>{hotelId}</Text>
      <Text>{offers?.price?.total}</Text>
    </View>
  );
};

export default Hotel;

const styles = StyleSheet.create({});
