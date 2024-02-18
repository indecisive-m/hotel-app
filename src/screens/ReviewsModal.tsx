import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ResolvedPreviewOptions } from "vite";
import { Review, StackParamList } from "constants/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fontSize, spacing } from "constants/styles";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

type Props = NativeStackScreenProps<StackParamList, "ReviewsModal">;
const ReviewsModal = ({ route, navigation }: Props) => {
  const { reviews } = route.params;

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
      <View key={item.publishTime} style={styles.container}>
        <View style={styles.infoContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.name}>
              {item.authorAttribution?.displayName}
            </Text>
            <View style={styles.starsContainer}>{rating}</View>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {new Date(item.publishTime).toDateString()}
            </Text>
            <Text style={styles.date}>
              {item.relativePublishTimeDescription}
            </Text>
          </View>
        </View>
        <Text style={styles.text}>{item.text.text}</Text>
      </View>
    );
  });
  return <ScrollView>{reviewsList}</ScrollView>;
};

export default ReviewsModal;

const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontFamily: "Rubik_400Regular",
    fontSize: fontSize.small,
    lineHeight: fontSize.small * 1.4,
    letterSpacing: 0.4,
    padding: spacing.extraSmall,
    backgroundColor: "white",
  },
  name: {
    fontSize: fontSize.large,

    fontFamily: "CormorantGaramond_700Bold",
    marginBottom: spacing.small,
    paddingHorizontal: spacing.extraSmall,
  },
  date: {
    fontFamily: "Rubik_400Regular_Italic",
    fontSize: fontSize.small,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.medium,
  },
  infoContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "orange",
    marginBottom: spacing.medium,
    paddingBottom: spacing.extraSmall,
  },
  starsContainer: {
    flexDirection: "row",
    gap: spacing.tiny,
    marginBottom: spacing.extraSmall,
    paddingHorizontal: spacing.medium,
  },
});
