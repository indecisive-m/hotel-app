import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Offers, StackParamList } from "constants/types";

import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import {
  ListRenderItem,
  Pressable,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { roomSize } from "constants/styles";

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
          <Text>Offer ID: {item.id}</Text>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.row}>
            <Ionicons name="bed" size={22} color="black" />
            <Text>{bed}</Text>
          </View>
          {item?.room?.description?.text.includes("Wireless" || "internet") ? (
            <View style={styles.row}>
              <Ionicons name="wifi" size={26} color={"black"} />
              <Text>Free WiFi</Text>
            </View>
          ) : null}
          {item?.room?.description?.text.match(roomSize) ? (
            <View style={styles.row}>
              <SimpleLineIcons name="size-fullscreen" size={18} color="black" />
              <Text>{item?.room?.description?.text?.match(roomSize)?.[0]}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.type}>
          {!category ? null : <Text>{type}</Text>}
        </View>
        <View style={styles.priceBox}>
          <Text style={styles.priceText}>
            {item.price.total} {item.price.currency} total price
          </Text>
          <Text style={styles.priceText}>Press to find out more</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RoomDetailsCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  priceBox: {
    backgroundColor: "black",
    paddingVertical: 20,
    gap: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 20,
  },
  priceText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "orange",

    marginHorizontal: 10,
    gap: 5,
    marginTop: 10,
  },
  infoBox: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "baseline",
  },
  id: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  type: {
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
