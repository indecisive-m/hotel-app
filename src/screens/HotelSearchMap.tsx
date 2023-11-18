import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
  ListRenderItem,
  Button,
  ActivityIndicator,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Key, useEffect, useState } from "react";
import { StackParamList, Hotel, Offers } from "constants/types";
import useGetHotelList from "api/useGetHotelList";

import { QueryClient, useQuery, useQueryClient } from "react-query";

import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import useGetBearerKey from "api/useGetBearerKey";

type Props = NativeStackScreenProps<StackParamList, "HotelSearchMap">;

const HotelSearchMap = ({ navigation, route }: Props) => {
  const { width } = useWindowDimensions();
  const { fetchBearerKey } = useGetBearerKey();
  const [latitude, setLatitude] = useState(30.643868905461858);
  const [longitude, setLongitude] = useState(-49.27215378731489);
  const [latitudeDelta, setLatitudeDelta] = useState(87.27387561478429);
  const [longitudeDelta, setLongitudeDelta] = useState(126.56250536441803);

  const queryClient = useQueryClient();

  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ["hotels", 40.781928, -73.965342, 5],
    queryFn: () => useGetHotelList(40.781928, -73.965342, 5),
  });

  useEffect(() => {
    if (data) {
      setLatitude(+data?.data[0]?.geoCode.latitude);
      setLongitude(+data?.data[0]?.geoCode.longitude);
      setLatitudeDelta(0.0922);
      setLongitudeDelta(0.3);
    }
  }, [data]);

  //   if (isLoading) {
  //     <ActivityIndicator />;
  //   }

  const renderedItem: ListRenderItem<Hotel> = ({ item }) => (
    <Pressable
      style={{ borderWidth: 1, borderColor: "red", padding: 10, margin: 5 }}
    >
      <Text>{item.name}</Text>
      <Text>{item.hotelId}</Text>
      <Text>{item.geoCode.longitude}</Text>
      <Text>{item.geoCode.latitude}</Text>
      <Text>{item.distance.value}</Text>
      <Button
        title="More info"
        onPress={() => navigation.navigate("Hotel", { hotelId: item.hotelId })}
      />
    </Pressable>
  );

  const onRegionChange = (region: Region) => {
    console.log(region);
  };

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        //TODO: set lat and long to initial above and then animate to new region once loaded.

        showsBuildings={true}
        style={{ height: width, width: width }}
      >
        {data?.data?.map((hotel: Hotel, index: Key) => {
          return (
            <Marker
              key={index}
              title={hotel.name}
              coordinate={{
                latitude: +hotel.geoCode.latitude,
                longitude: +hotel.geoCode.longitude,
              }}
            />
          );
        })}
      </MapView>
      <FlatList data={data?.data} renderItem={renderedItem} />
    </View>
  );
};

export default HotelSearchMap;

const styles = StyleSheet.create({});
