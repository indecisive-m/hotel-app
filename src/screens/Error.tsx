import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StackParamList } from "constants/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<StackParamList, "Error">;

const Error = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
      <Text>No Details Available</Text>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </Pressable>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({});
