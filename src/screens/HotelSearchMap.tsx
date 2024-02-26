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
  Camera,
} from "react-native-maps";
import useGetBearerKey from "api/useGetBearerKey";
import { SafeAreaView } from "react-native-safe-area-context";
import ContentViewSelector from "components/ContentViewSelector";
import SearchDetails from "components/SearchDetails";
import PlaceHolderImage from "components/PlaceHolderImage";
import { borderRadius, fontSize, spacing } from "constants/styles";

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

  const [markerZoomLevel, setMarkerZoomLevel] = useState(5);
  let slicedData: HotelList = hotelList;

  const [showMap, setShowMap] = useState(true);

  const [region, setRegion] = useState({
    latitude: hotelList[0]?.geoCode?.latitude,
    longitude: hotelList[0]?.geoCode?.longitude,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  });

  const queryClient = useQueryClient();
  const mapViewRef = useRef<MapView>(null);

  const getZoomLevel = async () => {
    const zoom = await mapViewRef.current?.getCamera();
    setMarkerZoomLevel(zoom?.zoom!);
  };

  useEffect(() => {
    setLatitude(+hotelList[0]?.geoCode?.latitude);
    setLongitude(+hotelList[0]?.geoCode.longitude);
    setZoom(11);
  }, [slicedData, showMap]);

  const clusteredMarkers = useMemo(() => {
    const tenth = hotelList.length / 10;
    const eigth = hotelList.length / 8;
    const fifth = hotelList.length / 5;

    const third = hotelList.length / 2;

    if (markerZoomLevel <= 11.5) {
      return (slicedData = hotelList.slice(0, 1));
    }
    if (markerZoomLevel < 11.6) {
      return (slicedData = hotelList.slice(0, tenth));
    }

    if (markerZoomLevel >= 11.6 && markerZoomLevel < 12) {
      return (slicedData = hotelList.slice(0, eigth));
    }

    if (markerZoomLevel >= 12 && markerZoomLevel < 12.5) {
      return (slicedData = hotelList.slice(0, fifth));
    }

    if (markerZoomLevel >= 12.5 && markerZoomLevel < 13) {
      return (slicedData = hotelList.slice(0, third));
    }

    return (slicedData = hotelList);
  }, [markerZoomLevel, hotelList, getZoomLevel]);

  const renderedItem: ListRenderItem<Hotel> = ({ item, index }) => {
    return (
      <View
        style={{
          borderRadius: borderRadius.large,
          padding: spacing.small,
          backgroundColor: "#e9d5b1",
          width: width / 2 - 15,
          height: 310,
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
            padding: spacing.small,
          }}
        >
          <Text style={styles.text} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.text}>
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
            onMapLoaded={() => getZoomLevel()}
            onTouchMove={() => getZoomLevel()}
          >
            {slicedData !== undefined
              ? slicedData.map((hotel: Hotel, index: number) => {
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
                })
              : null}
          </Animated>
        </>
      ) : (
        <View>
          <FlatList
            data={hotelList}
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
    padding: spacing.extraSmall,
    gap: spacing.small,
  },
  button: {
    padding: spacing.extraSmall,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: borderRadius.large,
    backgroundColor: "orange",
  },

  buttonText: {
    alignSelf: "center",
    fontSize: fontSize.small,
    fontFamily: "Rubik_500Medium",
  },
  text: {
    fontFamily: "Rubik_400Regular",
    letterSpacing: 0.25,
  },
});
