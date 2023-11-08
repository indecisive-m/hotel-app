import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList } from "../constants/types";
import useGetBearerKey from "../api/useGetBearerKey";

type Props = NativeStackScreenProps<TabParamList, "Home">;

function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Home Screen!</Text>
      <Button title="Log" onPress={() => useGetBearerKey()} />
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
