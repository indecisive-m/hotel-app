import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ListRenderItem,
  Image,
  Pressable,
  ImageSourcePropType,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PopularStay, StackParamList } from "constants/types";
import { useQuery } from "react-query";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useGetHotelList from "api/useGetHotelList";
import { useMst } from "store";
import { borderRadius, fontSize, spacing } from "constants/styles";

type Props = NativeStackScreenProps<StackParamList, "Explore">;
type PopularStaysNavigationProp = Props["navigation"];
const { width } = Dimensions.get("window");

const PopularStays = () => {
  const { searchDestination } = useMst();

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

  const renderedItem: ListRenderItem<PopularStay> = ({ item }) => {
    return (
      <Pressable
        onPress={async () => {
          const getHotelList = await useGetHotelList(item.lat, item.lng, 3);
          if (getHotelList?.data) {
            navigation.navigate("HotelSearchMap", {
              hotelList: getHotelList.data,
            });
            searchDestination.setSearchDestination(item.city);
          }
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
            source={item.imageUri as ImageSourcePropType}
            style={styles.image}
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
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  marginBottom: 5,
                  fontFamily: "Rubik_500Medium",
                }}
              >
                {item.city}
              </Text>

              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  fontFamily: "Rubik_400Regular",
                }}
              >
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
  },
  list: {
    paddingTop: spacing.small,
  },
  icon: {
    color: "orange",
    fontSize: fontSize.huge,
  },
  image: {
    height: 220,
    width: width - 75,
    position: "absolute",
    objectFit: "cover",
    borderRadius: borderRadius.large,
  },
});

export default PopularStays;
