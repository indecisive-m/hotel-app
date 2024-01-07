import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  FlatList,
} from "react-native";
import React from "react";

const ImageGallery = () => {
  const { width } = useWindowDimensions();

  return (
    <View>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        <Image
          source={require("../../assets/hotel_1.jpg")}
          style={{ height: width, width: width }}
        />
        <Image
          source={require("../../assets/hotel_2.jpg")}
          style={{ height: width, width: width }}
        />
        <Image
          source={require("../../assets/hotel_3.jpg")}
          style={{ height: width, width: width }}
        />
        <Image
          source={require("../../assets/hotel_4.jpg")}
          style={{ height: width, width: width }}
        />
      </ScrollView>
    </View>
  );
};

export default ImageGallery;

const styles = StyleSheet.create({});
