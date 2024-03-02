import { Pressable, StyleSheet, Text, TextStyle, View } from "react-native";
import React, { useContext } from "react";
import { StackParamList } from "constants/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { darkTheme, fontSize, lightTheme, spacing } from "constants/styles";
import { ThemeContext } from "constants/context";
type Props = NativeStackScreenProps<StackParamList, "Error">;

const Error = ({ navigation }: Props) => {
  const { theme } = useContext(ThemeContext);
  const color = theme === "dark" ? darkTheme : lightTheme;

  const $text: TextStyle = {
    fontSize: fontSize.extraLarge,
    fontFamily: "Rubik_600SemiBold",
    marginBottom: spacing.small,
  };

  const $secondaryText: TextStyle = {
    fontSize: fontSize.large,
    fontFamily: "Rubik_400Regular",
    color: color.accent400,
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
      <Text style={$text}>No Details Available</Text>
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={$secondaryText}>GO BACK</Text>
      </Pressable>
    </View>
  );
};

export default Error;
