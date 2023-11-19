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
import useGetHotelDetails from "api/useGetHotelDetails";
import ImageGallery from "components/ImageGallery";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<StackParamList, "Hotel">;

const Hotel = ({ route, navigation }: Props) => {
  const { hotelId } = route.params;

  const queryClient = useQueryClient();

  const { data, isLoading, status, isSuccess, refetch } = useQuery({
    queryKey: ["hotel", hotelId, 2],
    queryFn: () => useGetHotelDetails(hotelId, 2),
  });

  if (isLoading) {
    navigation.setOptions({ headerShown: false });
    return (
      <ActivityIndicator
        size={"large"}
        style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}
      />
    );
  }

  if (!data?.data) {
    navigation.setOptions({ headerShown: false });
    return (
      <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
        <Text>No Details Available</Text>
      </View>
    );
  }

  if (isSuccess) {
    navigation.setOptions({ headerShown: true, title: `${data?.hotel.name}` });
  }

  const renderedItem: ListRenderItem<Offers> = ({ item }) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: "red",
          padding: 10,
          marginTop: 10,
        }}
      >
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
      <ImageGallery />

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
