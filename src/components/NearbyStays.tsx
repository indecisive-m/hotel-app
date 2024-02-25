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
} from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import { GeoCode, Hotel, StackParamList } from "constants/types";
import useGetHotelList from "api/useGetHotelList";
import { QueryClient, useQueries, useQuery, useQueryClient } from "react-query";
import { Entypo } from "@expo/vector-icons";
import { fontSize, spacing } from "constants/styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<StackParamList, "Explore">;
type NearbyStaysNavigationProp = Props["navigation"];

const NearbyStays = () => {
  const queryClient = useQueryClient();
  const { width } = useWindowDimensions();
  const [permission, setPermission] = useState(false);

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

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.flexContainer}>
          <View>
            <Text style={styles.header}>Hotels Nearby</Text>
            <Text style={styles.text}>Based on your location</Text>
          </View>
          <Entypo name="location-pin" style={styles.icon} />
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
      <View style={styles.container}>
        <View style={styles.flexContainer}>
          <View>
            <Text style={styles.header}>Hotels Nearby</Text>
            <Text style={styles.text}>Based on your location</Text>
          </View>
          <Entypo name="location-pin" style={styles.icon} />
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
            <Text style={[styles.text, { color: "white" }]}>{`${item.distance.value
              } ${item.distance.unit.toLowerCase()}s away`}</Text>
          </View>
        </LinearGradient>
      </View>
    </Pressable>
  );
  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <View>
          <Text style={styles.header}>Hotels Nearby</Text>
          <Text style={styles.text}>Based on your location</Text>
        </View>
        <Entypo name="location-pin" style={styles.icon} />
      </View>

      <FlatList
        data={data?.data.slice(0, 5)}
        renderItem={renderedItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
};

export default NearbyStays;

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.medium,
  },
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    fontSize: fontSize.extraLarge,
    paddingBottom: spacing.tiny,
    fontFamily: "CormorantGaramond_700Bold_Italic",
  },
  text: {
    fontSize: fontSize.extraSmall,
    fontFamily: "Rubik_400Regular",
  },
  list: {
    paddingTop: spacing.small,
  },
  icon: {
    color: "orange",
    fontSize: fontSize.huge,
  },
  image: {},
});
