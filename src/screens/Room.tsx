import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React, { useContext } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RoomTax, StackParamList } from "constants/types";
import { useQuery } from "react-query";
import useGetRoomDetails from "api/useGetRoomDetails";
import ImageGallery from "components/ImageGallery";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useMst } from "store";
import {
  borderRadius,
  darkTheme,
  fontSize,
  lightTheme,
  spacing,
} from "constants/styles";
import { ThemeContext } from "constants/context";

type Props = NativeStackScreenProps<StackParamList, "Room">;

const Room = ({ route, navigation }: Props) => {
  const { roomId, bedType } = route.params;
  const { hotel } = useMst();
  const { theme } = useContext(ThemeContext);
  const color = theme === "dark" ? darkTheme : lightTheme;

  const $description: ViewStyle = {
    borderRadius: borderRadius.medium,
    padding: spacing.small,
    gap: spacing.small,
    backgroundColor: color.secondary,
  };

  const $descriptionText: TextStyle = {
    fontSize: fontSize.small,
    color: color.font,
  };

  const $disclaimerText: TextStyle = {
    fontSize: fontSize.small,
    fontFamily: "Rubik_300Light_Italic",
    color: color.font,
  };

  const $row: ViewStyle = {
    flexDirection: "row",
    gap: spacing.tiny,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  };

  const $box: ViewStyle = {
    borderRadius: borderRadius.medium,
    padding: spacing.small,
    marginTop: spacing.small,
    backgroundColor: color.accent,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "baseline",
    gap: spacing.small,
  };

  const $text: TextStyle = {
    fontSize: fontSize.small,
    letterSpacing: 0.25,
    color: color.font,
    fontFamily: "Rubik_400Regular",
  };

  const $container: ViewStyle = {
    padding: spacing.small,
    gap: spacing.large,
    backgroundColor: color.neutral,
  };

  const $title: TextStyle = {
    fontWeight: "bold",
    fontSize: fontSize.medium,
    textDecorationLine: "underline",
    fontFamily: "CormorantGaramond_700Bold",
    color: color.font,
  };

  const $priceBox: ViewStyle = {
    backgroundColor: color.accent,
    borderRadius: borderRadius.medium,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.small,
    gap: spacing.small,
  };

  const $button: ViewStyle = {
    borderRadius: borderRadius.circle,
    padding: spacing.small,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };

  const $buttonText: TextStyle = {
    alignSelf: "center",
    fontSize: fontSize.extraLarge,
    fontFamily: "CormorantGaramond_700Bold",
    fontWeight: "500",
    color: color.font,
  };

  const { data, isLoading, status, isSuccess, refetch } = useQuery({
    queryKey: ["room", roomId],
    queryFn: () => useGetRoomDetails(roomId),
  });

  const roomSizeRegEx = /\d\d[s][q][m]/gim;
  const totalPrice = data?.data?.price?.total;
  const basePrice = data?.data?.price?.base;
  const roomDescription = data?.data?.description?.text;
  let roomTax;
  let roomTaxCode;
  let roomInfo: object[] = [];
  const guests = hotel.numberOfAdults;
  const currency = data?.data?.price?.currency;
  const checkInDate = new Date(data?.data?.checkInDate);
  const checkOutDate = new Date(data?.data?.checkOutDate);

  const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.round(timeDifference / (1000 * 3600 * 24));
  const bedLowerCase = bedType?.toLowerCase();
  const bed = bedLowerCase?.charAt(0).toUpperCase() + bedLowerCase?.slice(1);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: color.neutral,
        }}
      >
        <ActivityIndicator size={"large"} color={color.font} />
      </View>
    );
  }
  if (!data?.data) {
    navigation.navigate("Error");
  }

  if (data?.data?.price?.taxes) {
    data?.data?.price.taxes.forEach((tax: RoomTax) => {
      roomInfo.push({ [tax.code]: tax.amount });
    });
  }

  return (
    <ScrollView style={{ backgroundColor: color.neutral }}>
      <ImageGallery />
      <View style={$container}>
        <View style={$box}>
          <View style={$row}>
            <Ionicons name="bed" size={22} color={color.font} />
            <Text style={$text}>{bed}</Text>
          </View>
          <View style={$row}>
            <MaterialIcons name="person" size={24} color={color.font} />

            <Text style={$text}>{guests}</Text>
          </View>

          {roomDescription?.includes("Wireless" || "internet") ? (
            <View style={$row}>
              <Ionicons name="wifi" size={22} color={color.font} />
              <Text style={$text}>Free WiFi</Text>
            </View>
          ) : null}
          {roomDescription?.match(roomSizeRegEx) ? (
            <View style={$row}>
              <SimpleLineIcons
                name="size-fullscreen"
                size={18}
                color={color.font}
              />
              <Text style={$text}>
                {roomDescription?.match(roomSizeRegEx)[0]}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={$description}>
          <Text style={$disclaimerText}>
            Note: This room description is generated from the API and only
            includes keywords
          </Text>
          <Text style={$text}>{roomDescription}</Text>
        </View>

        <View style={$priceBox}>
          <Text style={$title}>Price breakdown:</Text>
          <Text style={$text}>
            {nights} Night(s): {basePrice}
          </Text>
          <Text style={$text}>Rooms: {hotel.numberOfRooms}</Text>

          {roomInfo
            ? roomInfo.map((item, idx) => {
                const [key, value] = Object.entries(item)[0];

                const lowerCaseKey = key.replace("_", " ").toLowerCase();
                let objectKey;

                if (lowerCaseKey.includes(" ")) {
                  const secondWordCapitalIndex = lowerCaseKey.search(" ") + 1;
                  objectKey =
                    lowerCaseKey.charAt(0).toUpperCase() +
                    lowerCaseKey.slice(1, secondWordCapitalIndex) +
                    lowerCaseKey.charAt(secondWordCapitalIndex).toUpperCase() +
                    lowerCaseKey.slice(secondWordCapitalIndex + 1);
                } else {
                  objectKey =
                    lowerCaseKey.charAt(0).toUpperCase() +
                    lowerCaseKey.slice(1);
                }

                return (
                  <Text style={$text} key={idx}>
                    {objectKey}: {value}
                  </Text>
                );
              })
            : null}
          <Text style={$text}>Total Price: {totalPrice}</Text>
          <Text style={$disclaimerText}>All prices in {currency}</Text>
        </View>
        <LinearGradient
          colors={["#dc4d01", color.accent]}
          start={{ x: 0.9, y: 0.1 }}
          end={{ x: 0.05, y: 0.5 }}
          style={$button}
        >
          <Pressable>
            <Text style={$buttonText}>Reserve</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default Room;
