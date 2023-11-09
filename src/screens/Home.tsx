import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList } from "../constants/types";
import useGetBearerKey from "../api/useGetBearerKey";
import useGetHotelList from "api/useGetHotelList";
import { useEffect, useState } from "react";

type Props = NativeStackScreenProps<TabParamList, "Home">;

function Home({ navigation }: Props) {
  const { fetchBearerKey } = useGetBearerKey();
  return (
    <View style={styles.container}>
      <Text>Home Screen!</Text>
      <Text>{}</Text>
      <Button title="Log" onPress={fetchBearerKey} />

      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
      />
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
