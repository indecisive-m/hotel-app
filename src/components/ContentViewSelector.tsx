import { View, StyleSheet, Pressable, Text } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { borderRadius, spacing } from "constants/styles";

const ContentViewSelector = (props: {
  showMap: boolean;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <View style={[styles.selectorContainer, { alignSelf: "center" }]}>
      <Pressable
        onPress={() => props.setShowMap(true)}
        style={[
          styles.selector,
          { borderEndWidth: 1, borderColor: "black" },
          props.showMap
            ? { backgroundColor: "orange" }
            : { backgroundColor: "white" },
        ]}
      >
        <Entypo name="map" size={18} color={"black"} />
        <Text style={styles.text}>Map View</Text>
      </Pressable>
      <Pressable
        onPress={() => props.setShowMap(false)}
        style={[
          styles.selector,
          !props.showMap
            ? { backgroundColor: "orange" }
            : { backgroundColor: "white" },
        ]}
      >
        <Entypo name="list" size={18} color={"black"} />
        <Text style={styles.text}>List View</Text>
      </Pressable>
    </View>
  );
};

export default ContentViewSelector;

const styles = StyleSheet.create({
  selectorContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: borderRadius.large,
    overflow: "hidden",
  },
  selector: {
    padding: spacing.small,
    flexDirection: "row",
    gap: spacing.tiny,
    alignItems: "center",
  },
  text: {
    fontFamily: "Rubik_400Regular",
    letterSpacing: 0.25,
  },
});
