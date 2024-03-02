import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React, { useContext, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { TabParamList } from "../constants/types";
import { observer } from "mobx-react-lite";
import { store, useMst } from "store";
import {
  borderRadius,
  darkTheme,
  fontSize,
  lightTheme,
  spacing,
} from "constants/styles";
import { ThemeContext } from "constants/context";

type Props = NativeStackScreenProps<TabParamList, "Settings">;

const Settings = observer(({ navigation }: Props) => {
  const { unit } = useMst();
  const { theme, setTheme } = useContext(ThemeContext);
  let color = theme === "dark" ? darkTheme : lightTheme;
  const [currentUnit, setCurrentUnit] = useState(unit.unit);

  const $test: ViewStyle = {
    height: 100,
    width: 100,
    backgroundColor: color.accent400,
  };

  const $container: ViewStyle = {
    padding: spacing.medium,
    gap: spacing.medium,
  };

  const $buttonContainer: ViewStyle = {
    backgroundColor: "white",
    borderRadius: borderRadius.medium,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: spacing.medium,
  };

  const $text: TextStyle = {
    fontFamily: "Rubik_400Regular",
    fontSize: fontSize.medium,
  };

  const $headerText: TextStyle = {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: fontSize.extraLarge,
  };

  const $helperText: TextStyle = {
    fontFamily: "Rubik_400Regular_Italic",
    fontSize: fontSize.small,
  };

  const $button: ViewStyle = {
    padding: spacing.small,
    width: "50%",
    borderRadius: borderRadius.medium,
    alignItems: "center",
  };

  const setDarkTheme = () => {
    setTheme("dark");
    store.theme.setTheme("dark");
  };

  const setLightTheme = () => {
    setTheme("light");
    store.theme.setTheme("light");
  };

  return (
    <View style={$container}>
      <Text style={$headerText}>Set Distance Unit</Text>
      <View style={$buttonContainer}>
        <Pressable
          onPress={() => (unit.setUnit("KM"), setCurrentUnit("KM"))}
          style={[
            $button,
            currentUnit === "KM"
              ? { backgroundColor: color.accent400 }
              : { backgroundColor: "white" },
          ]}
        >
          <Text style={$text}>KM</Text>
        </Pressable>
        <Pressable
          onPress={() => (unit.setUnit("MILE"), setCurrentUnit("MILE"))}
          style={[
            $button,
            currentUnit === "MILE"
              ? { backgroundColor: color.accent400 }
              : { backgroundColor: "white" },
          ]}
        >
          <Text style={$text}>Mile</Text>
        </Pressable>
      </View>
      <View>
        <Text style={$helperText}>Currently selected unit: {unit.unit}</Text>
      </View>
      <Text style={$headerText}>Set Theme</Text>
      <View style={$buttonContainer}>
        <Pressable
          onPress={() => setDarkTheme()}
          style={[
            $button,
            theme === "dark"
              ? { backgroundColor: color.accent400 }
              : { backgroundColor: "white" },
          ]}
        >
          <Text style={$text}>Dark</Text>
        </Pressable>
        <Pressable
          onPress={() => setLightTheme()}
          style={[
            $button,
            theme === "light"
              ? { backgroundColor: color.accent400 }
              : { backgroundColor: "white" },
          ]}
        >
          <Text style={$text}>Light</Text>
        </Pressable>
      </View>
      <Text style={$helperText}>Current theme: {theme}</Text>
    </View>
  );
});

export default Settings;
