import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  ListRenderItem,
  Image,
  useWindowDimensions,
  Pressable,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import { GeoCode, Hotel, StackParamList } from "constants/types";
import useGetHotelList from "api/useGetHotelList";
import { QueryClient, useQueries, useQuery, useQueryClient } from "react-query";
import { Entypo } from "@expo/vector-icons";
import { darkTheme, fontSize, lightTheme, spacing } from "constants/styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "constants/context";

type Props = NativeStackScreenProps<StackParamList, "Explore">;
type NearbyStaysNavigationProp = Props["navigation"];

const NearbyStays = () => {
  const queryClient = useQueryClient();
  const { width } = useWindowDimensions();
  const [permission, setPermission] = useState(false);
  const { theme } = useContext(ThemeContext);
  const color = theme === "dark" ? darkTheme : lightTheme;

  const navigation = useNavigation<NearbyStaysNavigationProp>();

  const [localLocation, setLocalLocation] = useState<GeoCode>({
    latitude: "",
    longitude: "",
  });

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["local", localLocation.latitude, localLocation.longitude],
    queryFn: () =>
      useGetHotelList(localLocation.latitude, localLocation.longitude, 10),
  });

  const localRoomId = data?.data[0]?.hotelId;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setPermission(true);
      }

      let location = await Location.getLastKnownPositionAsync();

      setLocalLocation({
        latitude: `${location?.coords.latitude}`,
        longitude: `${location?.coords.longitude}`,
      });
    })();
  }, []);

  const $container: ViewStyle = {
    paddingVertical: spacing.medium,
  };

  const $flexContainer: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const $header: TextStyle = {
    fontSize: fontSize.extraLarge,
    paddingBottom: spacing.tiny,
    fontFamily: "CormorantGaramond_700Bold_Italic",
    color: color.font,
  };

  const $text: TextStyle = {
    fontSize: fontSize.extraSmall,
    fontFamily: "Rubik_400Regular",
    color: color.font,
  };

  const $list: ViewStyle = {
    paddingTop: spacing.small,
  };

  const $icon: TextStyle = {
    color: color.accent,
    fontSize: fontSize.huge,
  };

  if (isLoading) {
    return (
      <View style={$container}>
        <View style={$flexContainer}>
          <View>
            <Text style={$header}>Hotels Nearby</Text>
            <Text style={$text}>Based on your location</Text>
          </View>
          <Entypo name="location-pin" style={$icon} />
        </View>
        <View
          style={{
            marginTop: 20,
            padding: 20,
            position: "relative",
            overflow: "hidden",
            height: 220,
            backgroundColor: "#d3d3d3",
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"small"} />
        </View>
      </View>
    );
  }

  if (!permission) {
    return (
      <View style={$container}>
        <View style={$flexContainer}>
          <View>
            <Text style={$header}>Hotels Nearby</Text>
            <Text style={$text}>Based on your location</Text>
          </View>
          <Entypo name="location-pin" style={$icon} />
        </View>
        <View
          style={{
            marginTop: 20,
            padding: 20,
            position: "relative",
            overflow: "hidden",
            height: 220,
            backgroundColor: "#d3d3d3",
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Please allow location permissions</Text>
        </View>
      </View>
    );
  }
  const renderedItem: ListRenderItem<Hotel> = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate("Hotel", { hotelId: item.hotelId })}
    >
      <View
        style={{
          marginRight: 10,
          position: "relative",
          overflow: "hidden",
          height: 220,
          width: width - 75,
        }}
      >
        <Image
          source={require("../../assets/hotel_2.jpg")}
          style={{
            height: 220,
            width: width - 75,
            position: "absolute",
            objectFit: "cover",
            borderRadius: 15,
          }}
        />
        <LinearGradient
          colors={["transparent", "black"]}
          start={{ x: 0.5, y: 0.35 }}
          end={{ x: 0.5, y: 0.9 }}
          style={{ height: 220, borderRadius: 15 }}
        >
          <View style={{ position: "absolute", bottom: 20, left: 20 }}>
            <Text
              style={[
                {
                  color: "white",
                  marginBottom: 5,
                  fontSize: 14,
                  fontFamily: "Rubik_500Medium",
                },
              ]}
            >
              {item.name}
            </Text>
            <Text style={[$text, { color: "white" }]}>{`${
              item.distance.value
            } ${item.distance.unit.toLowerCase()}s away`}</Text>
          </View>
        </LinearGradient>
      </View>
    </Pressable>
  );
  return (
    <View style={$container}>
      <View style={$flexContainer}>
        <View>
          <Text style={$header}>Hotels Nearby</Text>
          <Text style={$text}>Based on your location</Text>
        </View>
        <Entypo name="location-pin" style={$icon} />
      </View>

      <FlatList
        data={data?.data.slice(0, 5)}
        renderItem={renderedItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={$list}
      />
    </View>
  );
};

export default NearbyStays;
