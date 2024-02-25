import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList, OffersList, Offers } from "../constants/types";
import { QueryClient, useQueries, useQuery, useQueryClient } from "react-query";
import useGetHotelDetails from "api/useGetHotelDetails";

import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE, Animated } from "react-native-maps";

import { SafeAreaView } from "react-native-safe-area-context";
import useGetHotelInfo from "api/useGetHotelInfo";
import useGetHotelPhotos from "api/useGetHotelPhotos";
import RoomDetailsCard from "components/RoomDetailsCard";
import { borderRadius, fontSize, spacing } from "constants/styles";

type Props = NativeStackScreenProps<StackParamList, "Hotel">;

const Hotel = ({ route, navigation }: Props) => {
  const [reviewsShown, setReviewsShown] = useState(false);
  const [showAmenities, setShowAmenities] = useState(false);
  const { hotelId } = route.params;
  const { width } = useWindowDimensions();
  const queryClient = useQueryClient();

  const mapViewRef = useRef<MapView>(null);
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

  if (isLoading || hotelInfo.isLoading || !hotelInfo.data?.photoUris) {
    navigation.setOptions({ headerShown: false });
    return (
      <ActivityIndicator
        size={"large"}
        style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}
      />
    );
  }

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
        style={{
          height: width,
          width: width,
          resizeMode: "cover",
          overflow: "hidden",
        }}
      />
    );
  };

  return (
    <>
      <ScrollView>
        <FlatList
          data={hotelInfo.data?.photoUris}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          renderItem={renderedImages}
        />
        <View style={styles.container}>
          <View style={styles.addressContainer}>
            <Text style={styles.hotelNameText}>{hotelName}</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={22} color="orange" />
              <Text style={styles.ratingText}>
                {places?.rating}
                <Text
                  style={{
                    fontSize: fontSize.small,
                    fontFamily: "Rubik_400Regular",
                  }}
                >
                  / 5
                </Text>
              </Text>
              <Text style={{ fontFamily: "Rubik_400Regular_Italic" }}>
                ({places?.userRatingCount} total ratings)
              </Text>
            </View>
            <Text style={styles.summary}>{places?.editorialSummary.text}</Text>
            <View>
              <Pressable>
                <Animated
                  provider={PROVIDER_GOOGLE}
                  ref={mapViewRef}
                  camera={{
                    center: {
                      latitude: data?.hotel?.latitude,
                      longitude: data?.hotel?.longitude,
                    },
                    zoom: 14,
                    heading: 0,
                    pitch: 0,
                  }}
                  showsBuildings={true}
                  minZoomLevel={6}
                  scrollEnabled={false}
                  style={styles.map}
                >
                  <Marker
                    title={hotelName}
                    coordinate={{
                      latitude: data?.hotel?.latitude,
                      longitude: data?.hotel?.longitude,
                    }}
                  />
                </Animated>
              </Pressable>

              <Text style={styles.addressText}>{places?.formattedAddress}</Text>
              <Pressable style={styles.phoneContainer}>
                <FontAwesome name={"phone"} size={20} color="black" />
                <Text style={styles.phoneText}>
                  {places?.internationalPhoneNumber}
                </Text>
              </Pressable>
            </View>
          </View>

          <Pressable
            onPress={() => setShowAmenities(!showAmenities)}
            style={styles.headerContainer}
          >
            <Text style={styles.headerText}>Amenities</Text>

            <Ionicons
              name={showAmenities ? "chevron-up" : "chevron-down"}
              size={24}
              color="black"
            />
          </Pressable>
          {showAmenities ? (
            <View style={styles.expandedContainer}>
              <View style={styles.flexRow}>
                <FontAwesome name="shower" style={styles.icon} />
                <Text style={styles.detailsItem}>Shower</Text>
              </View>
              <View style={styles.flexRow}>
                <FontAwesome name="bathtub" style={styles.icon} />
                <Text style={styles.detailsItem}>Bath</Text>
              </View>
              <View style={styles.flexRow}>
                <Ionicons name="wifi" style={styles.icon} />

                <Text style={styles.detailsItem}>WiFi</Text>
              </View>
              <View style={styles.flexRow}>
                <MaterialCommunityIcons name="hair-dryer" style={styles.icon} />
                <Text style={styles.detailsItem}>Hairdryer</Text>
              </View>
              <View style={styles.flexRow}>
                <Entypo name="tv" style={styles.icon} />
                <Text style={styles.detailsItem}>TV</Text>
              </View>
              {places?.allowsDogs ? (
                <View style={styles.flexRow}>
                  <MaterialIcons name="pets" style={styles.icon} />
                  <Text style={styles.detailsItem}>Pets Allowed</Text>
                </View>
              ) : (
                <View style={styles.flexRow}>
                  <FontAwesome name="ban" style={styles.icon} />
                  <Text style={styles.detailsItem}>No pets</Text>
                </View>
              )}
              {places?.accessibilityOptions.wheelchairAccessibleEntrance ? (
                <View style={styles.flexRow}>
                  <FontAwesome5 name="wheelchair" style={styles.icon} />
                  <Text style={styles.detailsItem}>Wheelchair accessible</Text>
                </View>
              ) : null}
              {places?.accessibilityOptions.wheelchairAccessibleParking ? (
                <View style={styles.flexRow}>
                  <FontAwesome5 name="wheelchair" style={styles.icon} />
                  <Text style={styles.detailsItem}>Disabled parking</Text>
                </View>
              ) : null}
            </View>
          ) : null}
          <Pressable
            style={styles.headerContainer}
            onPress={() =>
              navigation.navigate("ReviewsModal", { reviews: places?.reviews })
            }
          >
            <Text style={styles.headerText}>Reviews</Text>
            <Ionicons
              name={reviewsShown ? "chevron-up" : "chevron-forward"}
              size={24}
              color="black"
            />
          </Pressable>
        </View>
        <FlatList
          data={data?.data}
          renderItem={({ item }) => <RoomDetailsCard item={item} />}
          style={{ flex: 1 }}
        />
      </ScrollView>
    </>
  );
};

export default Hotel;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    padding: spacing.small,
    rowGap: spacing.medium,
  },
  addressContainer: {
    backgroundColor: "white",
    padding: spacing.small,
    borderRadius: borderRadius.medium,
    rowGap: spacing.small,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: spacing.small,
    alignItems: "baseline",
    paddingHorizontal: spacing.small,
  },
  headerContainer: {
    padding: spacing.small,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderTopRightRadius: borderRadius.medium,
    borderTopLeftRadius: borderRadius.medium,
    borderBottomWidth: spacing.micro,
    borderBottomColor: "orange",
  },
  detailsItem: {
    fontFamily: "Rubik_400Regular",
    fontSize: fontSize.medium,
  },
  headerText: {
    fontSize: fontSize.extraLarge,
    fontFamily: "CormorantGaramond_600SemiBold",
  },
  summary: {
    padding: spacing.small,
    backgroundColor: "orange",
    fontSize: fontSize.small,
    fontFamily: "Rubik_400Regular",
    borderTopRightRadius: borderRadius.medium,
    borderTopLeftRadius: borderRadius.medium,
  },
  hotelNameText: {
    fontSize: fontSize.extraLarge,
    fontFamily: "CormorantGaramond_700Bold",
    paddingHorizontal: spacing.medium,
  },
  addressText: {
    fontSize: fontSize.small,
    marginTop: spacing.tiny,
    fontFamily: "Rubik_400Regular",
  },
  phoneText: {
    fontSize: fontSize.small,
    fontFamily: "Rubik_400Regular_Italic",
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.small,
    marginTop: spacing.small,
    backgroundColor: "orange",
    padding: spacing.small,
    borderBottomLeftRadius: borderRadius.medium,
    borderBottomRightRadius: borderRadius.medium,
  },
  ratingText: {
    fontSize: fontSize.medium,
    fontFamily: "Rubik_400Regular",
  },
  map: {
    flex: 1,
    height: 100,
    width: "auto",
  },
  expandedContainer: {
    backgroundColor: "white",
    padding: spacing.small,
    marginTop: -spacing.medium,
    borderBottomLeftRadius: borderRadius.medium,
    borderBottomRightRadius: borderRadius.medium,
    rowGap: spacing.extraSmall,
  },
  flexRow: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: borderRadius.small,
    alignItems: "center",
    gap: spacing.medium,
    padding: spacing.small,
  },
  icon: {
    width: "13%",
    borderRightColor: "orange",
    borderRightWidth: 2,
    fontSize: fontSize.large,
    color: "orange",
  },
});
