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
import SearchForm from "components/SearchForm";
import { observer } from "mobx-react-lite";

type Props = NativeStackScreenProps<StackParamList, "Explore">;

const Explore = observer(({ navigation }: Props) => {
  const { fetchBearerKey } = useGetBearerKey();
  const queryClient = useQueryClient();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["hotels", 51.507218, -0.127586, 5],
    queryFn: () => useGetHotelList(51.507218, -0.127586, 5),
    enabled: false,
  });

  useEffect(() => {
    fetchBearerKey();
    refetch();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchForm />
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
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default Explore;
