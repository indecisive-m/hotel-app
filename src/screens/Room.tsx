import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "constants/types";
import { useQuery } from "react-query";
import useGetRoomDetails from "api/useGetRoomDetails";
import ImageGallery from "components/ImageGallery";
import { Zocial } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<StackParamList, "Room">;

const Room = ({ route, navigation }: Props) => {
  const { roomId, bedType } = route.params;

  const { data, isLoading, status, isSuccess, refetch } = useQuery({
    queryKey: ["room", roomId],
    queryFn: () => useGetRoomDetails(roomId),
  });

  const roomSizeRegEx = /\d\d[s][q][m]/gim;
  const totalPrice = data?.data?.price?.total;
  const basePrice = data?.data?.price?.base;
  const roomDescription = data?.data?.description?.text;
  const roomTax = data?.data?.price?.taxes[0]?.amount;
  const roomTaxCode = data?.data?.price?.taxes[0]?.code;
  const guests = data?.data?.guests?.adults;
  const currency = data?.data?.price?.currency;
  const bedLowerCase = bedType.toLowerCase();
  const bed = bedLowerCase.charAt(0).toUpperCase() + bedLowerCase.slice(1);

  //if (data) {
  //const roomSqm = roomDescription?.match(roomSizeRegEx);
  //roomSqm.splice(1, 0, " - ");
  //const roomSize = roomSqm.join("");
  //console.log(roomSize);
  //return roomSize;
  //}

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <ScrollView>
      <ImageGallery />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <View style={styles.box}>
            <Ionicons name="bed" size={22} color="black" />
            <Text style={styles.text}>{bed}</Text>
          </View>
          <View style={styles.box}>
            <Zocial name="guest" size={20} color="black" />
            <Text style={styles.text}>{guests}</Text>
          </View>

          {roomDescription.includes("Wireless" || "internet") ? (
            <View style={styles.box}>
              <Ionicons name="wifi" size={22} color={"black"} />
              <Text style={styles.text}>Free WiFi</Text>
            </View>
          ) : null}
          {roomDescription.match(roomSizeRegEx) ? (
            <View style={styles.box}>
              <Text style={styles.text}>Hello</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.description}>
          <Text>{roomDescription}</Text>
        </View>
        <View style={styles.box}>
          <Text>Room Price: {basePrice}</Text>
          <Text>
            {roomTaxCode}: {roomTax}
          </Text>
          <Text>Total Price: {totalPrice}</Text>
          <Text>All prices in {currency}</Text>
        </View>
        <Pressable>
          <Text>Book this room</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Room;

const styles = StyleSheet.create({
  description: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    backgroundColor: "#e3e3e3",
  },
  box: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    padding: 10,
    backgroundColor: "#e3e3e3",
    justifyContent: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 10,
  },
  text: {
    fontSize: 20,
  },
  container: {
    padding: 10,
    gap: 20,
  },
});
