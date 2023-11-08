import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { TabParamList } from "../constants/types";

type Props = NativeStackScreenProps<TabParamList, "Settings">;

const Settings = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
