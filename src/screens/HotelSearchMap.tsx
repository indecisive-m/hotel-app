import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ListRenderItem,
  Button,
  ActivityIndicator,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Key, useEffect, useRef, useState } from "react";
import { StackParamList, Hotel, Offers } from "constants/types";
import useGetHotelList from "api/useGetHotelList";

import { QueryClient, useQuery, useQueryClient } from "react-query";

import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Region,
  AnimatedRegion,
  Animated,
} from "react-native-maps";
import useGetBearerKey from "api/useGetBearerKey";

type Props = NativeStackScreenProps<StackParamList, "HotelSearchMap">;

const HotelSearchMap = ({ navigation, route }: Props) => {
  const { width } = useWindowDimensions();
  const { fetchBearerKey } = useGetBearerKey();

  const { hotelList } = route.params;
  const [latitude, setLatitude] = useState(hotelList[0]?.geoCode?.latitude);
  const [longitude, setLongitude] = useState(hotelList[0]?.geoCode?.longitude);
  const [latitudeDelta, setLatitudeDelta] = useState(0.0922);
  const [longitudeDelta, setLongitudeDelta] = useState(0.3);

  const [region, setRegion] = useState({
    latitude: 30.643868905461858,
    longitude: -49.27215378731489,
    latitudeDelta: 87.27387561478429,
    longitudeDelta: 126.56250536441803,
  });

  const queryClient = useQueryClient();
  const mapViewRef = useRef<MapView>(null);

  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ["hotels", latitude, longitude, 5],
    queryFn: () => useGetHotelList(latitude, longitude, 5),
    onError: (error) => {
      console.log(error + "in query");
    },
  });

  useEffect(() => {
    if (data) {
      setRegion({
        latitude: +data?.data[0]?.geoCode.latitude,
        longitude: +data?.data[0]?.geoCode.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.3,
      });

      mapViewRef.current?.animateCamera(
        {
          center: { latitude: region.latitude, longitude: region.longitude },
          zoom: 10.5,
        },
        { duration: 1500 }
      );
    }
  }, []);

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

  const renderedItem: ListRenderItem<Hotel> = ({ item, index }) => (
    <View
      style={{
        borderWidth: 1,
        borderColor: "red",
        padding: 10,
        backgroundColor: "#ededed",
        marginBottom: 10,
        height: 175,
      }}
    >
      <Text>{item.name}</Text>
      <Text>{item.hotelId}</Text>
      <Text>{item.geoCode.longitude}</Text>
      <Text>{item.geoCode.latitude}</Text>
      <Text>{item.distance.value}</Text>
      <Text>{index}</Text>
      <Button
        title="More info"
        onPress={() => navigation.navigate("Hotel", { hotelId: item.hotelId })}
      />
    </View>
  );

  return (
    <View>
      <Animated
        provider={PROVIDER_GOOGLE}
        ref={mapViewRef}
        camera={{
          center: { latitude: region.latitude, longitude: region.longitude },
          zoom: 1,
          heading: 0,
          pitch: 0,
        }}
        showsBuildings={true}
        style={{ height: width, width: width }}
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
      <View>
        <FlatList
          data={data?.data}
          renderItem={renderedItem}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};
export default HotelSearchMap;

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
});
