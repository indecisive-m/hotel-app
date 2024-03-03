import {
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React, { useContext } from "react";
import { ResolvedPreviewOptions } from "vite";
import { Review, StackParamList } from "constants/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { darkTheme, fontSize, lightTheme, spacing } from "constants/styles";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { ThemeContext } from "constants/context";

type Props = NativeStackScreenProps<StackParamList, "ReviewsModal">;

const ReviewsModal = ({ route, navigation }: Props) => {
  const { reviews } = route.params;
  const { theme } = useContext(ThemeContext);
  const color = theme === "dark" ? darkTheme : lightTheme;

  const $container: ViewStyle = {
    padding: spacing.medium,
    backgroundColor: color.neutral,
  };

  const $text: TextStyle = {
    fontFamily: "Rubik_400Regular",
    fontSize: fontSize.small,
    lineHeight: fontSize.small * 1.4,
    letterSpacing: 0.4,
    padding: spacing.extraSmall,
    color: color.font,
    backgroundColor: color.secondary,
  };

  const $name: TextStyle = {
    fontSize: fontSize.large,
    fontFamily: "CormorantGaramond_700Bold",
    marginBottom: spacing.small,
    paddingHorizontal: spacing.extraSmall,
    color: color.font,
  };

  const $date: TextStyle = {
    fontFamily: "Rubik_400Regular_Italic",
    fontSize: fontSize.small,
    color: color.font,
  };

  const $dateContainer: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.medium,
  };

  const $infoContainer: ViewStyle = {
    borderBottomWidth: 2,
    borderBottomColor: color.accent,
    marginBottom: spacing.medium,
    paddingBottom: spacing.extraSmall,
  };

  const $starsContainer: ViewStyle = {
    flexDirection: "row",
    gap: spacing.tiny,
    marginBottom: spacing.extraSmall,
    paddingHorizontal: spacing.medium,
  };

  navigation.setOptions({ headerTitle: "Reviews" });
  if (!reviews) return <Text>No reviews available</Text>;

  const reviewsList = reviews.map((item) => {
    const ratingToNumber = parseInt(item.rating);
    const ratingStars = [];

    for (let i = 1; i <= ratingToNumber; i++) {
      ratingStars.push(i);
    }

    const rating = ratingStars.map((item) => {
      return <FontAwesome key={item} name="star" size={20} color="orange" />;
    });

    return (
      <View key={item.publishTime} style={$container}>
        <View style={$infoContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={$name}>{item.authorAttribution?.displayName}</Text>
            <View style={$starsContainer}>{rating}</View>
          </View>
          <View style={$dateContainer}>
            <Text style={$date}>
              {new Date(item.publishTime).toDateString()}
            </Text>
            <Text style={$date}>{item.relativePublishTimeDescription}</Text>
          </View>
        </View>
        <Text style={$text}>{item.text.text}</Text>
      </View>
    );
  });
  return <ScrollView>{reviewsList}</ScrollView>;
};

export default ReviewsModal;
