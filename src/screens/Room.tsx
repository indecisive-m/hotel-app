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
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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
  const checkInDate = new Date(data?.data?.checkInDate);
  const checkOutDate = new Date(data?.data?.checkOutDate);

  const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.round(timeDifference / (1000 * 3600 * 24));
  const bedLowerCase = bedType?.toLowerCase();
  const bed = bedLowerCase?.charAt(0).toUpperCase() + bedLowerCase?.slice(1);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  if (!data?.data) {
    navigation.navigate("Error");
  }

  return (
    <ScrollView>
      <ImageGallery />
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.row}>
            <Ionicons name="bed" size={22} color="black" />
            <Text style={styles.text}>{bed}</Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="person" size={24} color="black" />
            <Text style={styles.text}>{guests}</Text>
          </View>

          {roomDescription?.includes("Wireless" || "internet") ? (
            <View style={styles.row}>
              <Ionicons name="wifi" size={22} color={"black"} />
              <Text style={styles.text}>Free WiFi</Text>
            </View>
          ) : null}
          {roomDescription?.match(roomSizeRegEx) ? (
            <View style={styles.row}>
              <SimpleLineIcons name="size-fullscreen" size={18} color="black" />
              <Text style={styles.text}>
                {roomDescription?.match(roomSizeRegEx)[0]}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.description}>
          <Text style={styles.disclaimerText}>
            Note: This room description is generated from the API and only
            includes keywords
          </Text>
          <Text style={styles.text}>{roomDescription}</Text>
        </View>
        <View style={styles.priceBox}>
          <Text style={styles.title}>Price breakdown:</Text>
          <Text style={styles.text}>
            {nights} {nights < 1 ? "Nights :" : "Night :"} {basePrice}
          </Text>
          <Text style={styles.text}>
            {roomTaxCode}: {roomTax}
          </Text>
          <Text style={styles.text}>Total Price: {totalPrice}</Text>
          <Text style={styles.disclaimerText}>All prices in {currency}</Text>
        </View>
        <LinearGradient
          colors={["#dc4d01", "orange"]}
          start={{ x: 0.9, y: 0.1 }}
          end={{ x: 0.05, y: 0.5 }}
          style={styles.button}
        >
          <Pressable>
            <Text style={styles.buttonText}>Reserve this room</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default Room;

const styles = StyleSheet.create({
  description: {
    borderRadius: 10,
    padding: 10,
    gap: 10,
    backgroundColor: "white",
  },
  descriptionText: {
    fontSize: 14,
  },
  disclaimerText: {
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
    gap: 5,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    backgroundColor: "white",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "baseline",
    gap: 10,
  },
  text: {
    fontSize: 16,
    letterSpacing: 0.25,
  },
  container: {
    padding: 10,
    gap: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textDecorationLine: "underline",
  },
  priceBox: {
    backgroundColor: "rgb(255, 204, 128)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
    borderColor: "black",
  },

  button: {
    borderRadius: 50,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  buttonText: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "500",
  },
});
