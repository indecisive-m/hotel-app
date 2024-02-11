import { useMemo } from "react";
import { StyleSheet, Image } from "react-native";

const PlaceHolderImage = (props: {
  height: number;
  width: number;
  randomImageNumber: number;
}) => {
  const imageArray = [
    require("../../assets/hotel_1.jpg"),
    require("../../assets/hotel_2.jpg"),
    require("../../assets/hotel_3.jpg"),
    require("../../assets/hotel_4.jpg"),
  ];

  const imageSource = useMemo(() => imageArray[props.randomImageNumber], []);

  return (
    <>
      <Image
        source={imageSource}
        style={{
          height: props.height,
          width: props.width,
          borderRadius: 15,
        }}
      />
    </>
  );
};

export default PlaceHolderImage;

const styles = StyleSheet.create({});
