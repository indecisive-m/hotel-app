import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  StyleSheet,
  ListRenderItem,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList, Hotel, HotelList } from "../constants/types";

import useGetBearerKey from "../api/useGetBearerKey";
import useGetHotelList from "api/useGetHotelList";
import { useState } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";

type Props = NativeStackScreenProps<StackParamList, "Home">;

function Home({ navigation }: Props) {
  const { fetchBearerKey } = useGetBearerKey();

  const queryClient = useQueryClient();

  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ["hotels", 51.51264, 0.10089, 5],
    queryFn: () => useGetHotelList(51.51264, 0.10089, 5),
    enabled: false,
  });

  const onPress = () => {
    // refetch();
    navigation.navigate("HotelSearchMap", { hotelList: data?.data });
  };

  if (isLoading) {
    return <ActivityIndicator size={"large"} />;
  }

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

  return (
    <View style={styles.container}>
      <Text>Home Screen!</Text>
      <Button title="Get Bearer Key" onPress={fetchBearerKey} />
      <Button
        title="Get Hotel List"
        onPress={onPress}
        // onPress={() => fetchHotelList(51.51264, 0.10089, 5)}
      />
      <Button
        title="Get Hotel"
        onPress={() => navigation.navigate("Hotel", { hotelId: "MCLONGHM" })}
      />

      <FlatList data={data?.data} renderItem={renderedItem} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
