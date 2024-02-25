import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Offers, StackParamList } from "constants/types";

import { Ionicons, SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { borderRadius, fontSize, roomSize, spacing } from "constants/styles";

type Props = NativeStackScreenProps<StackParamList, "Hotel">;

type RoomDetailsCardNavigationProp = Props["navigation"];

type item = {
  item: Offers;
};

const RoomDetailsCard: React.FC<item> = ({ item }) => {
  const navigation = useNavigation<RoomDetailsCardNavigationProp>();

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

  return (
    <Pressable
      onPress={() => handleRoomSearch(item.id, item.room.typeEstimated.bedType)}
    >
      <View style={styles.container}>
        <View style={styles.id}>
          <Text style={styles.text}>Offer ID: {item.id}</Text>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.row}>
            <Ionicons name="bed" size={22} color="black" />
            <Text style={styles.text}>{bed}</Text>
          </View>
          {item?.room?.description?.text.includes("Wireless" || "internet") ? (
            <View style={styles.row}>
              <Ionicons name="wifi" size={26} color={"black"} />
              <Text style={styles.text}>Free WiFi</Text>
            </View>
          ) : null}
          {item?.room?.description?.text.match(roomSize) ? (
            <View style={styles.row}>
              <SimpleLineIcons name="size-fullscreen" size={18} color="black" />
              <Text style={styles.text}>
                {item?.room?.description?.text?.match(roomSize)?.[0]}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.type}>
          {!category ? null : <Text style={styles.text}>{type}</Text>}
        </View>
        <View style={styles.priceBox}>
          <Text style={styles.priceText}>
            {item.price.total} {item.price.currency}
            <Text style={styles.totalPrice}> TOTAL PRICE</Text>
          </Text>
          <View style={styles.priceBtn}>
            <Text style={styles.priceText}>Find out more</Text>
            <AntDesign name="arrowright" size={22} color="black" />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default RoomDetailsCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.small,
    alignItems: "center",
  },
  priceBox: {
    backgroundColor: "orange",
    opacity: 0.75,
    paddingVertical: spacing.medium,
    gap: spacing.small,
    borderBottomLeftRadius: borderRadius.medium,
    borderBottomRightRadius: borderRadius.medium,

    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: spacing.medium,
    paddingTop: spacing.medium,
  },
  priceText: {
    color: "black",
    fontSize: fontSize.small,
    fontFamily: "Rubik_600SemiBold",
  },
  container: {
    borderRadius: borderRadius.medium,
    backgroundColor: "white",
    marginHorizontal: spacing.small,
    gap: spacing.tiny,
    marginTop: spacing.small,
  },
  infoBox: {
    paddingHorizontal: spacing.medium,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "baseline",
  },
  id: {
    padding: spacing.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  type: {
    paddingHorizontal: spacing.medium,
    paddingTop: spacing.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Rubik_400Regular",
    fontSize: spacing.medium,
  },
  priceBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.medium,
  },
  totalPrice: {
    fontFamily: "Rubik_500Medium_Italic",
    fontSize: fontSize.extraSmall,
  },
});
