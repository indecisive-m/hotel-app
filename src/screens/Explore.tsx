import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  View,
  ScrollView,
  ViewStyle,
  Text,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList, Hotel, HotelList, GeoCode } from "../constants/types";

import useGetBearerKey from "../api/useGetBearerKey";
import { useState, useEffect, useContext } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import NearbyStays from "components/NearbyStays";
import SearchForm from "components/SearchForm";
import { observer } from "mobx-react-lite";
import PopularStays from "components/PopularStays";
import { useIsFocused } from "@react-navigation/native";
import { darkTheme, lightTheme, spacing } from "constants/styles";
import { ThemeContext } from "constants/context";

type Props = NativeStackScreenProps<StackParamList, "Explore">;

const Explore = observer(({ navigation }: Props) => {
  const { fetchBearerKey } = useGetBearerKey();
  const queryClient = useQueryClient();
  const isFocused = useIsFocused();
  const { theme } = useContext(ThemeContext);
  const color = theme === "dark" ? darkTheme : lightTheme;
  // useEffect(() => {
  //   fetchBearerKey();
  // }, []);

  const $container: ViewStyle = {
    flex: 1,
    padding: spacing.medium,
    backgroundColor: color.neutral,
  };
  return (
    <SafeAreaView style={$container}>
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

      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
});

export default Explore;
