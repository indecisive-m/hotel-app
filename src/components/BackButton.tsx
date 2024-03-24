import React, { useContext } from "react";

import { Ionicons } from "@expo/vector-icons";
type Props = NativeStackScreenProps<StackParamList, "Explore">;
type SearchFormNavigationProp = Props["navigation"];
import { darkTheme, lightTheme } from "constants/styles";
import { ThemeContext } from "constants/context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "constants/types";
import { useNavigation } from "@react-navigation/native";

const BackButton = () => {
  const { theme } = useContext(ThemeContext);
  const color = theme === "dark" ? darkTheme : lightTheme;

  const navigation = useNavigation<SearchFormNavigationProp>();

  return (
    <Ionicons
      name="arrow-back-outline"
      size={24}
      color={color.font}
      onPress={() => navigation.goBack()}
    />
  );
};

export default BackButton;
