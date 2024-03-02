import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import React, { useContext } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { TabParamList } from "../constants/types";
import { observer } from "mobx-react-lite";
import { store, useMst } from "store";
import { SafeAreaView } from "react-native-safe-area-context";
import { darkTheme, lightTheme } from "constants/styles";
import { ThemeContext } from "constants/context";

type Props = NativeStackScreenProps<TabParamList, "Settings">;

const Settings = observer(({ navigation }: Props) => {
  const { unit } = useMst();
  const { theme, setTheme } = useContext(ThemeContext);

  const setDarkTheme = () => {
    setTheme("dark");
    store.theme.setTheme("dark");
  };

  const setLightTheme = () => {
    setTheme("light");
    store.theme.setTheme("light");
  };

  const themeColor = store.theme.theme;

  let color = themeColor === "dark" ? darkTheme : lightTheme;

  const $test: ViewStyle = {
    height: 100,
    width: 100,
    backgroundColor: color.accent400,
  };
  return (
    <SafeAreaView>
      <View>
        <Text>Settings</Text>
        <View>
          <Text>Set Distance Unit</Text>
          <Pressable onPress={() => unit.setUnit("KM")} style={{ padding: 20 }}>
            <Text>KM</Text>
          </Pressable>
          <Pressable
            onPress={() => unit.setUnit("MILE")}
            style={{ padding: 20 }}
          >
            <Text>Miles</Text>
          </Pressable>
        </View>
        <View>
          <Text>Currently selected unit: {unit.unit}</Text>
        </View>
      </View>
      <Pressable onPress={() => setDarkTheme()}>
        <Text>Dark Theme</Text>
      </Pressable>
      <Pressable onPress={() => setLightTheme()}>
        <Text>Light Theme</Text>
      </Pressable>
      <Text>Current theme: {theme}</Text>
      <View style={$test}></View>
    </SafeAreaView>
  );
});

export default Settings;
