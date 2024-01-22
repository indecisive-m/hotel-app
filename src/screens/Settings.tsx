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
import { types } from "mobx-state-tree";
import { observer } from "mobx-react-lite";

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
