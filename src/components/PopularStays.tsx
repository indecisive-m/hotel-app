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
import { LinearGradient } from "expo-linear-gradient";
import { PopularStay, StackParamList } from "constants/types";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useGetGeoCode from "api/useGetGeoCode";
import { useState } from "react";
import useGetHotelList from "api/useGetHotelList";

type Props = NativeStackScreenProps<StackParamList, "Explore">;
type PopularStaysNavigationProp = Props["navigation"];

const PopularStays = () => {
  const { width } = useWindowDimensions();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const navigation = useNavigation<PopularStaysNavigationProp>();

  const DATA = [
    {
      city: "London",
      imageUri: require("../../assets/london.jpg"),
      lat: 51.507218,
      lng: -0.127586,
      country: "United Kingdom",
    },
    {
      city: "New York",
      imageUri: require("../../assets/newyork.jpg"),
      lat: 40.712775,
      lng: -74.005973,
      country: "United States of America",
    },
    {
      city: "Oslo",
      imageUri: require("../../assets/oslo.jpg"),
      lat: 59.913869,
      lng: 10.752245,
      country: "Norway",
    },
    {
      city: "Paris",
      imageUri: require("../../assets/paris.jpg"),
      lat: 48.856614,
      lng: 2.352222,
      country: "France",
    },
    {
      city: "Rome",
      imageUri: require("../../assets/rome.jpg"),
      lat: 41.902784,
      lng: 12.496366,
      country: "Italy",
    },
    {
      city: "Sydney",
      imageUri: require("../../assets/sydney.jpg"),
      lat: -33.86882,
      lng: 151.20929,
      country: "Australia",
    },
  ];

  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["popular", lat, lng],
    queryFn: () => useGetHotelList(lat, lng, 3),
  });

  const renderedItem: ListRenderItem<PopularStay> = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          setLat(item.lat);
          setLng(item.lng);
        }}
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
            source={item.imageUri}
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
            <View
              style={{
                position: "absolute",
                bottom: 20,
                left: 20,
              }}
            >
              <Text style={{ color: "white", fontSize: 18, marginBottom: 5 }}>
                {item.city}
              </Text>

              <Text style={{ color: "white", fontSize: 12 }}>
                {item.country.toUpperCase()}
              </Text>
            </View>
          </LinearGradient>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <View>
          <Text style={styles.header}>Popular Destinations</Text>
        </View>
      </View>

      <FlatList
        data={DATA}
        renderItem={renderedItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 20,
    paddingBottom: 5,
  },
  text: {
    fontSize: 12,
  },
  list: {
    paddingTop: 10,
  },
  icon: {
    color: "orange",
    fontSize: 36,
  },
  image: {},
});

export default PopularStays;