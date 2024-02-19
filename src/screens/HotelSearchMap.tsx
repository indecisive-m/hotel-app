import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ListRenderItem,
  Button,
  ActivityIndicator,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Key, useEffect, useMemo, useRef, useState } from "react";
import { StackParamList, Hotel, Offers, HotelList } from "constants/types";
import useGetHotelList from "api/useGetHotelList";
import { useHeaderHeight } from "@react-navigation/elements";

import { QueryClient, useQuery, useQueryClient } from "react-query";

import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Region,
  AnimatedRegion,
  Animated,
} from "react-native-maps";
import useGetBearerKey from "api/useGetBearerKey";
import { SafeAreaView } from "react-native-safe-area-context";
import ContentViewSelector from "components/ContentViewSelector";
import SearchDetails from "components/SearchDetails";
import PlaceHolderImage from "components/PlaceHolderImage";

type Props = NativeStackScreenProps<StackParamList, "HotelSearchMap">;

const HotelSearchMap = ({ navigation, route }: Props) => {
  const { width, height } = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const { fetchBearerKey } = useGetBearerKey();

  const ASPECT_RATIO = width / height;

  const { hotelList } = route.params;
  const [zoom, setZoom] = useState(5);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [latitudeDelta, setLatitudeDelta] = useState(0.0922);
  const [longitudeDelta, setLongitudeDelta] = useState(
    latitudeDelta * ASPECT_RATIO
  );

  const [showMap, setShowMap] = useState(true);

  const [region, setRegion] = useState({
    latitude: hotelList[1]?.geoCode?.latitude,
    longitude: hotelList[1]?.geoCode?.longitude,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  });

  const queryClient = useQueryClient();
  const mapViewRef = useRef<MapView>(null);

  const { data, refetch, error, isLoading } = useQuery({
    queryKey: [
      "hotels",
      hotelList[0]?.geoCode?.latitude,
      hotelList[0]?.geoCode?.longitude,
      5,
    ],
    queryFn: () =>
      useGetHotelList(
        hotelList[0]?.geoCode.latitude,
        hotelList[0]?.geoCode.longitude,
        5
      ),
    onError: (error) => {
      console.log(error + "in query");
    },
  });

  useEffect(() => {
    mapViewRef.current?.animateCamera(
      {
        center: {
          latitude: data?.data[0]?.geoCode.latitude,
          longitude: data?.data[0]?.geoCode.longitude,
        },
        zoom: 10.5,
      },
      { duration: 1500 }
    );
    setTimeout(() => {
      setLatitude(data?.data[0]?.geoCode.latitude);
      setLongitude(data?.data[0]?.geoCode.longitude);
      setZoom(10.5);
    }, 2000);
  }, [data, showMap]);

  if (isLoading) {
    <ActivityIndicator
      style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}
      size={"large"}
    />;
  }

  if (error) {
    fetchBearerKey();
    refetch();
  }

  console.log(data?.data.slice(0, -300).length);
  const renderedItem: ListRenderItem<Hotel> = ({ item, index }) => {
    return (
      <View
        style={{
          borderRadius: 15,
          padding: 10,
          backgroundColor: "#e9d5b1",
          width: width / 2 - 15,
          height: 300,
          position: "relative",
          justifyContent: "flex-end",
        }}
      >
        <View style={{ position: "absolute", top: 0, left: 0 }}>
          <PlaceHolderImage
            height={width / 2 - 15}
            width={width / 2 - 15}
            randomImageNumber={Math.floor(Math.random() * 4)}
          />
        </View>
        <View
          style={{
            backgroundColor: "#e9d5b1",
            position: "absolute",
            top: width / 2 - 15,
            left: 0,
            right: 0,
            padding: 10,
          }}
        >
          <Text numberOfLines={2}>{item.name}</Text>
          <Text>
            {item.distance.value} {item.distance.unit.toLocaleLowerCase()}s away
          </Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate("Hotel", { hotelId: item.hotelId })
          }
        >
          <Text style={styles.buttonText}>More Information</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchDetails />
      {showMap ? (
        <>
          <Animated
            provider={PROVIDER_GOOGLE}
            ref={mapViewRef}
            showsBuildings={true}
            camera={{
              center: {
                latitude: latitude,
                longitude: longitude,
              },
              zoom: zoom,
              heading: 0,
              pitch: 0,
            }}
            style={{ height: height, width: width }}
            onRegionChange={(region) => console.log(region)}
          >
            {data?.data?.map((hotel: Hotel, index: number) => {
              return (
                <Marker
                  key={index}
                  title={hotel.name}
                  coordinate={{
                    latitude: +hotel.geoCode.latitude,
                    longitude: +hotel.geoCode.longitude,
                  }}
                  onCalloutPress={() =>
                    navigation.navigate("Hotel", { hotelId: hotel.hotelId })
                  }
                />
              );
            })}
          </Animated>
        </>
      ) : (
        <View>
          <FlatList
            data={data?.data}
            keyExtractor={(item) => item.hotelId}
            renderItem={renderedItem}
            contentContainerStyle={styles.list}
            numColumns={2}
            columnWrapperStyle={{ gap: 10 }}
          />
        </View>
      )}
      <ContentViewSelector showMap={showMap} setShowMap={setShowMap} />
    </SafeAreaView>
  );
};

export default HotelSearchMap;

const styles = StyleSheet.create({
  list: {
    padding: 10,
    gap: 10,
  },
  button: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 15,
    backgroundColor: "orange",
  },

  buttonText: {
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "500",
  },
});
