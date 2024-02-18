import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ResolvedPreviewOptions } from "vite";
import { Review, StackParamList } from "constants/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<StackParamList, "ReviewsModal">;
const ReviewsModal = ({ route }: Props) => {
  const { reviews } = route.params;

  const reviewsList = reviews.map((item) => {
    return (
      <View>
        <Text>{item.authorAttribution?.displayName}</Text>
        <Text>{new Date(item.publishTime).toLocaleString()}</Text>
        <Text>{item.relativePublishTimeDescription}</Text>
        <Text>{item.rating}</Text>
        <Text>{item.text.text}</Text>
      </View>
    );
  });
  return (
    <ScrollView>
      <Text>Reviews</Text>
      {reviewsList}
    </ScrollView>
  );
};

export default ReviewsModal;

const styles = StyleSheet.create({});
