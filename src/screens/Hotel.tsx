import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList, OffersList, Offers } from "../constants/types";
import { QueryClient, useInfiniteQuery, useQueryClient } from "react-query";
import useFetchHotelDetails from "api/useFetchHotelDetails";

type Props = NativeStackScreenProps<StackParamList, "Hotel">;

const Hotel = ({ route, navigation }: Props) => {
  const { hotelId } = route.params;
  //   const { fetchHotelDetails } = useGetHotelDetails(hotelId, 2);
  //   const { results } = useFetch();
  // const [offers, setOffers] = useState<Offers>();

  const queryClient = useQueryClient();

  const { data, isLoading, status } = useInfiniteQuery({
    queryKey: ["hotel", hotelId, 2],
    queryFn: () => useFetchHotelDetails(hotelId, 2),
  });

  console.log(status);

  const hotelInfo = data?.pages[0]?.results.data[0]?.offers[0];

  console.log(data?.pages[0]);

  //   const { data, refetch, error, isLoading } = useQuery({
  //     queryKey: ["hotels", 51.51264, 0.10089, 5],
  //     queryFn: () => fetchHotelList(),
  //     enabled: false,
  //   });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (data === undefined) {
    return <Text>No Details Available</Text>;
  }

  return (
    <View>
      <Text>{hotelId}</Text>
      <Text>{hotelInfo?.price?.base}</Text>
      <Text>{hotelInfo?.price?.total}</Text>
      <Text>{hotelInfo?.price?.currency}</Text>
      <Text>{hotelInfo?.id}</Text>
      <Text>{hotelInfo?.room?.description?.text}</Text>
      <Text>{hotelInfo?.room?.typeEstimated?.bedType}</Text>
      <Text>{hotelInfo?.policies?.paymentType}</Text>
      <Text>{hotelInfo?.policies?.cancellations[0]?.description?.text}</Text>
      <Text>{hotelInfo?.policies?.cancellations[0]?.type}</Text>
      <Text>{hotelInfo?.policies?.cancellations[0]?.deadline}</Text>
      <Text>{hotelInfo?.policies?.cancellations[0]?.amount}</Text>
    </View>
  );
};

export default Hotel;

const styles = StyleSheet.create({});
