import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StackParamList } from "constants/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fontSize, spacing } from "constants/styles";
type Props = NativeStackScreenProps<StackParamList, "Error">;

const Error = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
      <Text style={styles.text}>No Details Available</Text>
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.secondaryText}>GO BACK</Text>
      </Pressable>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.extraLarge,
    fontFamily: "Rubik_600SemiBold",
    marginBottom: spacing.small,
  },
  secondaryText: {
    fontSize: fontSize.large,
    fontFamily: "Rubik_400Regular",
    color: "orange",
  },
});
