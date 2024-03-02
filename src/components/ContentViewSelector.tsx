import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { borderRadius, darkTheme, lightTheme, spacing } from "constants/styles";
import { ThemeContext } from "constants/context";
import { useContext } from "react";

const ContentViewSelector = (props: {
  showMap: boolean;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { theme } = useContext(ThemeContext);
  const color = theme === "dark" ? darkTheme : lightTheme;

  const $selectorContainer: ViewStyle = {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: borderRadius.large,
    overflow: "hidden",
  };

  const $selector: ViewStyle = {
    padding: spacing.small,
    flexDirection: "row",
    gap: spacing.tiny,
    alignItems: "center",
  };

  const $text: TextStyle = {
    fontFamily: "Rubik_400Regular",
    letterSpacing: 0.25,
  };

  return (
    <View style={[$selectorContainer, { alignSelf: "center" }]}>
      <Pressable
        onPress={() => props.setShowMap(true)}
        style={[
          $selector,
          { borderEndWidth: 1, borderColor: "black" },
          props.showMap
            ? { backgroundColor: color.accent400 }
            : { backgroundColor: "white" },
        ]}
      >
        <Entypo name="map" size={18} color={"black"} />
        <Text style={$text}>Map View</Text>
      </Pressable>
      <Pressable
        onPress={() => props.setShowMap(false)}
        style={[
          $selector,
          !props.showMap
            ? { backgroundColor: color.accent400 }
            : { backgroundColor: "white" },
        ]}
      >
        <Entypo name="list" size={18} color={"black"} />
        <Text style={$text}>List View</Text>
      </Pressable>
    </View>
  );
};

export default ContentViewSelector;
