import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Offers, StackParamList } from "constants/types";

import { Ionicons, SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native";
import {
  borderRadius,
  darkTheme,
  fontSize,
  lightTheme,
  roomSize,
  spacing,
} from "constants/styles";
import { ThemeContext } from "constants/context";
import { useContext } from "react";

type Props = NativeStackScreenProps<StackParamList, "Hotel">;

type RoomDetailsCardNavigationProp = Props["navigation"];

type item = {
  item: Offers;
};

const RoomDetailsCard: React.FC<item> = ({ item }) => {
  const navigation = useNavigation<RoomDetailsCardNavigationProp>();
  const { theme } = useContext(ThemeContext);
  const color = theme === "dark" ? darkTheme : lightTheme;
  const handleRoomSearch = (id: string, bedType: string) => {
    navigation.navigate("Room", { roomId: id, bedType: bedType });
  };

  let bedLowerCase;
  if (item?.room?.typeEstimated?.bedType === undefined) {
    bedLowerCase = "single";
  } else {
    bedLowerCase = item?.room?.typeEstimated?.bedType?.toLowerCase();
  }

  const bed = bedLowerCase?.charAt(0).toUpperCase() + bedLowerCase?.slice(1);

  const category = item?.room?.typeEstimated?.category;
  const roomType = category?.replace("_", " ").toLowerCase();
  let type;
  if (roomType?.includes(" ")) {
    const secondWordCapitalIndex = roomType.search(" ") + 1;
    type =
      roomType?.charAt(0).toUpperCase() +
      roomType?.slice(1, secondWordCapitalIndex) +
      roomType?.charAt(secondWordCapitalIndex).toUpperCase() +
      roomType?.slice(secondWordCapitalIndex + 1);
  } else {
    type = roomType?.charAt(0).toUpperCase() + roomType?.slice(1);
  }

  const $row: ViewStyle = {
    flexDirection: "row",
    gap: spacing.small,
    alignItems: "center",
  };

  const $priceBox: ViewStyle = {
    backgroundColor: color.accent,
    paddingVertical: spacing.medium,
    gap: spacing.small,
    borderBottomLeftRadius: borderRadius.medium,
    borderBottomRightRadius: borderRadius.medium,

    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: spacing.medium,
    paddingTop: spacing.medium,
  };

  const $priceText: TextStyle = {
    color: "black",
    fontSize: fontSize.small,
    fontFamily: "Rubik_600SemiBold",
  };

  const $container: ViewStyle = {
    borderRadius: borderRadius.medium,
    backgroundColor: color.secondary,
    marginHorizontal: spacing.small,
    gap: spacing.tiny,
    marginTop: spacing.small,
  };

  const $infoBox: ViewStyle = {
    paddingHorizontal: spacing.medium,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "baseline",
  };

  const $id: ViewStyle = {
    padding: spacing.medium,
    justifyContent: "center",
    alignItems: "center",
  };

  const $type: ViewStyle = {
    paddingHorizontal: spacing.medium,
    paddingTop: spacing.medium,
    justifyContent: "center",
    alignItems: "center",
  };

  const $text: TextStyle = {
    fontFamily: "Rubik_400Regular",
    fontSize: spacing.medium,
  };

  const $priceBtn: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.medium,
  };

  const $totalPrice: TextStyle = {
    fontFamily: "Rubik_500Medium_Italic",
    fontSize: fontSize.extraSmall,
  };

  return (
    <Pressable
      onPress={() => handleRoomSearch(item.id, item.room.typeEstimated.bedType)}
    >
      <View style={$container}>
        <View style={$id}>
          <Text style={$text}>Offer ID: {item.id}</Text>
        </View>
        <View style={$infoBox}>
          <View style={$row}>
            <Ionicons name="bed" size={22} color="black" />
            <Text style={$text}>{bed}</Text>
          </View>
          {item?.room?.description?.text.includes("Wireless" || "internet") ? (
            <View style={$row}>
              <Ionicons name="wifi" size={26} color={"black"} />
              <Text style={$text}>Free WiFi</Text>
            </View>
          ) : null}
          {item?.room?.description?.text.match(roomSize) ? (
            <View style={$row}>
              <SimpleLineIcons name="size-fullscreen" size={18} color="black" />
              <Text style={$text}>
                {item?.room?.description?.text?.match(roomSize)?.[0]}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={$type}>
          {!category ? null : <Text style={$text}>{type}</Text>}
        </View>
        <View style={$priceBox}>
          <Text style={$priceText}>
            {item.price.total} {item.price.currency}
            <Text style={$totalPrice}> TOTAL PRICE</Text>
          </Text>
          <View style={$priceBtn}>
            <Text style={$priceText}>Find out more</Text>
            <AntDesign name="arrowright" size={22} color="black" />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default RoomDetailsCard;

const styles = StyleSheet.create({
  text: {
    color: "#ffa500",
  },
});
