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
  TextInput,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList, Hotel, HotelList, GeoCode } from "../constants/types";

import useGetBearerKey from "../api/useGetBearerKey";
import useGetHotelList from "api/useGetHotelList";
import { useState, useEffect } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";

type Props = NativeStackScreenProps<StackParamList, "Home">;

function Home({ navigation }: Props) {
  const { fetchBearerKey } = useGetBearerKey();
  const [localLocation, setLocalLocation] = useState<GeoCode>({
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission Denied");
        return;
      }

      let location = await Location.getLastKnownPositionAsync();

      setLocalLocation({
        latitude: `${location?.coords.latitude}`,
        longitude: `${location?.coords.longitude}`,
      });
    })();
  }, []);

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

  return (
    <SafeAreaView style={styles.container}>
      <TextInput placeholder="Where are you going?" style={styles.input} />
      <TextInput placeholder="Select dates" style={styles.input} />
      <TextInput placeholder="How many adults" style={styles.input} />
      <Pressable style={styles.button}>
        <Text style={styles.text}>Search</Text>
      </Pressable>

      <View style={{ margin: 20 }}>
        <Button title="Get Bearer Key" onPress={fetchBearerKey} />
        <Button title="Get Hotel List" onPress={onPress} />
        <Button
          title="Get Hotel"
          onPress={() => navigation.navigate("Hotel", { hotelId: "MCLONGHM" })}
        />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    borderRadius: 50,
    backgroundColor: "orange",
    padding: 15,
    justifyContent: "center",
    width: "100%",
  },
  text: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "500",
  },
});

export default Home;
