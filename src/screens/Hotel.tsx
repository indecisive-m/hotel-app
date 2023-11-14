import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList, OffersList, Offers } from "../constants/types";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import useFetchHotelDetails from "api/useFetchHotelDetails";
import ImageGallery from "components/ImageGallery";

type Props = NativeStackScreenProps<StackParamList, "Hotel">;

const Hotel = ({ route, navigation }: Props) => {
  const { hotelId } = route.params;
  //   const { fetchHotelDetails } = useGetHotelDetails(hotelId, 2);
  //   const { results } = useFetch();
  const [hotelInfo, setHotelInfo] = useState<Offers>();

  const queryClient = useQueryClient();

  const { data, isLoading, status, isSuccess } = useQuery({
    queryKey: ["hotel", hotelId, 2],
    queryFn: () => useFetchHotelDetails(hotelId, 2),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (data === undefined) {
    return <Text>No Details Available</Text>;
  }

  const renderedItem: ListRenderItem<Offers> = ({ item }) => {
    return (
      <View>
        <Text>{item.id}</Text>
        <Text>{item.price.total}</Text>
        <Text>{item.room.description.text}</Text>
        <Text>{item.room.typeEstimated.bedType}</Text>
        <Text>{item.room.typeEstimated.category}</Text>
      </View>
    );
  };

  return (
    <>
      {/* <ScrollView style={{ flex: 1 }}>
        <ImageGallery />
        <View>
          <Text style={{ fontSize: 20 }}>{hotelId}</Text>
          <Text style={{ fontSize: 20 }}>{hotelInfo?.price?.base}</Text>
          <Text style={{ fontSize: 20 }}>{hotelInfo?.price?.total}</Text>
          <Text style={{ fontSize: 20 }}>{hotelInfo?.price?.currency}</Text>
          <Text style={{ fontSize: 20 }}>{hotelInfo?.id}</Text>
          <Text style={{ fontSize: 20 }}>
            {hotelInfo?.room?.description?.text}
          </Text>
          <Text style={{ fontSize: 20 }}>
            {hotelInfo?.room?.typeEstimated?.bedType}
          </Text>
          <Text style={{ fontSize: 20 }}>
            {hotelInfo?.policies?.paymentType}
          </Text>
          <Text style={{ fontSize: 20 }}>
            {hotelInfo?.policies?.cancellations[0]?.description?.text}
          </Text>
          <Text style={{ fontSize: 20 }}>
            {hotelInfo?.policies?.cancellations[0]?.type}
          </Text>
          <Text>{hotelInfo?.policies?.cancellations[0]?.deadline}</Text>
          <Text>{hotelInfo?.policies?.cancellations[0]?.amount}</Text>
        </View>
      </ScrollView> */}
      <FlatList
        data={data.data}
        renderItem={renderedItem}
        style={{ flex: 1 }}
      />
    </>
  );
};

export default Hotel;

const styles = StyleSheet.create({});
