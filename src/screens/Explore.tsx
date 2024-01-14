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
  ScrollView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList, Hotel, HotelList, GeoCode } from "../constants/types";

import useGetBearerKey from "../api/useGetBearerKey";
import useGetHotelList from "api/useGetHotelList";
import { useState, useEffect } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import NearbyStays from "components/NearbyStays";
import useGetGeoCode from "api/useGetGeoCode";
import { geocodeAsync } from "expo-location";

type Props = NativeStackScreenProps<StackParamList, "Explore">;

function Explore({ navigation }: Props) {
  const { fetchBearerKey } = useGetBearerKey();
  const [inputText, setInputText] = useState<string>("");
  const queryClient = useQueryClient();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["hotels", 51.507218, -0.127586, 5],
    queryFn: () => useGetHotelList(51.507218, -0.127586, 5),
    enabled: false,
  });

  const geoCode = useQuery({
    queryKey: ["search", inputText],
    queryFn: () => useGetGeoCode(inputText),
    enabled: false,
  });

  useEffect(() => {
    fetchBearerKey();
    refetch();
  }, []);

  const handleGeoCode = () => {
    const hotelList = new Promise((resolve) => resolve(geoCode.refetch()));

    hotelList.then((value) => {
      const hotels = value?.data;
      navigation.navigate("HotelSearchMap", {
        hotelList: hotels.data,
      });
    });
  };

  if (isLoading) {
    return <ActivityIndicator size={"large"} />;
  }

  const showModal = () => {
    navigation.navigate("CalendarModal");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput
          placeholder="Where are you going?"
          style={styles.input}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <Pressable style={styles.input} onPress={showModal}>
          <Text style={{ paddingVertical: 5, opacity: 0.5 }}>Select dates</Text>
        </Pressable>
        <TextInput placeholder="How many adults" style={styles.input} />
        <Pressable style={styles.button} onPress={() => handleGeoCode()}>
          <Text style={styles.text}>Search</Text>
        </Pressable>
        <NearbyStays />

        <View style={{ margin: 20 }}>
          <Button
            title="Get Hotel"
            onPress={() =>
              navigation.navigate("Hotel", { hotelId: "MCLONGHM" })
            }
          />
        </View>
      </ScrollView>

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
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    borderRadius: 50,
    backgroundColor: "orange",
    padding: 12,
    justifyContent: "center",
    width: "100%",
  },
  text: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "500",
  },
});

export default Explore;
