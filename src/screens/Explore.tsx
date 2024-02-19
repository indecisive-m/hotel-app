import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View, ScrollView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList, Hotel, HotelList, GeoCode } from "../constants/types";

import useGetBearerKey from "../api/useGetBearerKey";
import { useState, useEffect } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import NearbyStays from "components/NearbyStays";
import SearchForm from "components/SearchForm";
import { observer } from "mobx-react-lite";
import PopularStays from "components/PopularStays";
import { useIsFocused } from "@react-navigation/native";

type Props = NativeStackScreenProps<StackParamList, "Explore">;

const Explore = observer(({ navigation }: Props) => {
  const { fetchBearerKey } = useGetBearerKey();
  const queryClient = useQueryClient();
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   fetchBearerKey();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchForm />
        <NearbyStays />
        <PopularStays />

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
