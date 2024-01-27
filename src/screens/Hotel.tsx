import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
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

import { LinearGradient } from "expo-linear-gradient";
import { SimpleLineIcons } from "@expo/vector-icons";
import ImageGallery from "components/ImageGallery";
import { Ionicons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<StackParamList, "Hotel">;

const Hotel = ({ route, navigation }: Props) => {
  const { hotelId } = route.params;

  const queryClient = useQueryClient();

  const { data, isLoading, status, isSuccess, refetch } = useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: () => useGetHotelDetails(hotelId, false),
  });
  const roomSize = /\d\d[s][q][m]/gim;

  const handleRoomSearch = (id: string, bedType: string) => {
    navigation.navigate("Room", { roomId: id, bedType: bedType });
  };

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
    navigation.navigate("Error");
  }

  if (isSuccess) {
    navigation.setOptions({ headerShown: true, title: `${data?.hotel?.name}` });
  }

  const renderedItem: ListRenderItem<Offers> = ({ item }) => {
    const bedLowerCase = item?.room?.typeEstimated?.bedType?.toLowerCase();
    const bed = bedLowerCase?.charAt(0).toUpperCase() + bedLowerCase?.slice(1);

    const category = item?.room?.typeEstimated?.category;
    const roomType = category?.replace("_", " ").toLowerCase();
    let type;
    if (roomType?.includes(" ")) {
      const secondWordCapitalIndex = roomType.search(" ") + 1;
      type =
        roomType?.charAt(0).toUpperCase() +
        roomType?.slice(1, secondWordCapitalIndex) +
        roomType.charAt(secondWordCapitalIndex).toUpperCase() +
        roomType?.slice(secondWordCapitalIndex + 1);
    } else {
      type = roomType?.charAt(0).toUpperCase() + roomType?.slice(1);
    }

    return (
      <Pressable
        onPress={() =>
          handleRoomSearch(item.id, item.room.typeEstimated.bedType)
        }
      >
        <View style={styles.container}>
          <View style={styles.id}>
            <Text>Offer ID: {item.id}</Text>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.row}>
              <Ionicons name="bed" size={22} color="black" />
              <Text>{bed}</Text>
            </View>
            {item?.room?.description?.text.includes(
              "Wireless" || "internet"
            ) ? (
              <View style={styles.row}>
                <Ionicons name="wifi" size={26} color={"black"} />
                <Text>Free WiFi</Text>
              </View>
            ) : null}
            {item?.room?.description?.text.match(roomSize) ? (
              <View style={styles.row}>
                <SimpleLineIcons
                  name="size-fullscreen"
                  size={18}
                  color="black"
                />
                <Text>{item?.room?.description?.text?.match(roomSize)[0]}</Text>
              </View>
            ) : null}
          </View>
          <View style={styles.type}>
            {!category ? null : <Text>{type}</Text>}
          </View>
          <View style={styles.priceBox}>
            <Text style={styles.priceText}>
              {item.price.total} {item.price.currency} total price
            </Text>
            <Text style={styles.priceText}>Press to find out more</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <ImageGallery />

      <FlatList
        data={data?.data}
        renderItem={renderedItem}
        style={{ flex: 1 }}
      />
    </>
  );
};

export default Hotel;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  priceBox: {
    backgroundColor: "black",
    paddingVertical: 20,
    gap: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 20,
  },
  priceText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "orange",

    marginHorizontal: 10,
    gap: 5,
    marginTop: 10,
  },
  infoBox: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "baseline",
  },
  id: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  type: {
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
