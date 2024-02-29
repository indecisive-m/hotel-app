import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { TabParamList } from "../constants/types";
import { observer } from "mobx-react-lite";
import { useMst } from "store";
import { SafeAreaView } from "react-native-safe-area-context";
import themeColors, { colors } from "constants/styles";

type Props = NativeStackScreenProps<TabParamList, "Settings">;

const Settings = observer(({ navigation }: Props) => {
  const { unit, theme } = useMst();

  console.log(theme);
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
      <Pressable onPress={() => theme.setTheme("dark")}>
        <Text>Dark Theme</Text>
      </Pressable>
      <Pressable onPress={() => theme.setTheme("light")}>
        <Text>Light Theme</Text>
      </Pressable>
      <Text>Current theme: {theme.theme}</Text>
      <View
        style={{
          height: 100,
          width: 100,
          backgroundColor: colors.accent400,
        }}
      ></View>
    </SafeAreaView>
  );
});

export default Settings;

const styles = StyleSheet.create({});
