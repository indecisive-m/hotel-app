import {
  ActivityIndicator,
  Button,
  FlatList,
  ListRenderItem,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  ImageSourcePropType,
  ImageURISource,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList, OffersList, Offers } from "../constants/types";
import { QueryClient, useQueries, useQuery, useQueryClient } from "react-query";
import useGetHotelDetails from "api/useGetHotelDetails";

import { SimpleLineIcons } from "@expo/vector-icons";
import ImageGallery from "components/ImageGallery";
import { Ionicons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";
import useGetHotelInfo from "api/useGetHotelInfo";
import useGetHotelPhotos from "api/useGetHotelPhotos";
import RoomDetailsCard from "components/RoomDetailsCard";

type Props = NativeStackScreenProps<StackParamList, "Hotel">;

const Hotel = ({ route, navigation }: Props) => {
  const [reviewsShown, setReviewsShown] = useState(false);
  const { hotelId } = route.params;
  const { width } = useWindowDimensions();
  const queryClient = useQueryClient();

  const { data, isLoading, status, isSuccess, refetch } = useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: () => useGetHotelDetails(hotelId, false),
  });

  const hotelName = data?.hotel?.name;

  const hotelInfo = useQuery({
    queryKey: ["hotelInfo", hotelName],
    queryFn: () => useGetHotelInfo(),
    enabled: !!hotelName,
  });

  const places = hotelInfo.data?.data?.places[0];
  const photos = hotelInfo.data?.photoUris;

  const handleRoomSearch = (id: string, bedType: string) => {
    navigation.navigate("Room", { roomId: id, bedType: bedType });
  };

  if (isLoading || hotelInfo.isLoading || !hotelInfo.data?.photoUris) {
    navigation.setOptions({ headerShown: false });
    return (
      <ActivityIndicator
        size={"large"}
        style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}
      />
    );
  }

  const reviews = places?.reviews?.map((item) => {
    return (
      <>
        <Text>{item.authorAttribution?.displayName}</Text>
        <Text>{new Date(item.publishTime).toLocaleString()}</Text>
        <Text>{item.relativePublishTimeDescription}</Text>
        <Text>{item.rating}</Text>
        <Text>{item.text.text}</Text>
      </>
    );
  });

  // if (!data?.data) {
  //   navigation.navigate("Error");
  // }

  if (isSuccess) {
    navigation.setOptions({
      headerShown: true,
      title: `${data?.hotel?.name}`,
    });
  }

  const renderedImages: ListRenderItem<string> = ({ item }) => {
    return (
      <Image
        source={{ uri: item }}
        key={item}
        style={{ height: width, width: width, objectFit: "cover" }}
      />
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={hotelInfo.data?.photoUris}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderedImages}
      />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.addressContainer}>
            <Text>{hotelName}</Text>
            <Text>{places?.formattedAddress}</Text>
          </View>
          <Pressable>
            <Text>{places?.internationalPhoneNumber}</Text>
          </Pressable>
          <View style={styles.ratingContainer}>
            <Text>{places?.rating}</Text>
            <Ionicons name="star" size={24} color="orange" />
            <Text>{places?.userRatingCount} total ratings</Text>
          </View>
          <Text style={styles.summary}>{places?.editorialSummary.text}</Text>
          <View style={styles.detailsContainer}>
            <Text>{places?.allowsDogs ? "Pets Allowed" : "No Pets"}</Text>
            <Text>
              {places?.accessibilityOptions.wheelchairAccessibleEntrance
                ? "Wheelchair accessible"
                : null}
            </Text>
            <Text>
              {places?.accessibilityOptions.wheelchairAccessibleParking
                ? "Disabled Parking"
                : null}
            </Text>
          </View>
          <Pressable onPress={() => setReviewsShown(!reviewsShown)}>
            <View style={{ flexDirection: "row" }}>
              <Text>Show reviews</Text>
              <Ionicons name="chevron-down" size={24} color="black" />
            </View>
            {reviewsShown ? reviews : null}
          </Pressable>
        </View>
        <FlatList
          data={data?.data}
          renderItem={({ item }) => <RoomDetailsCard item={item} />}
          style={{ flex: 1 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Hotel;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  addressContainer: {
    backgroundColor: "white",
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  detailsContainer: {
    padding: 10,
  },
  summary: {
    padding: 10,
    backgroundColor: "orange",
    fontSize: 14,
  },
});
