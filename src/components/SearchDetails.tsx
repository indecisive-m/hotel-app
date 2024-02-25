import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";

import { useMst } from "store";
import { observer } from "mobx-react-lite";
import { borderRadius, fontSize, spacing } from "constants/styles";

const SearchDetails = observer(() => {
  const { dates, hotel, searchDestination } = useMst();

  return (
    <View style={styles.container}>
      <Text style={styles.location}>{searchDestination.searchDestination}</Text>
      <View style={styles.detailsWrapper}>
        <Text style={styles.details}>
          {dates.checkInDate} - {dates.checkOutDate}
        </Text>
        <Text style={styles.details}>{hotel.numberOfAdults} Adults</Text>
        <Text style={styles.details}>{hotel.numberOfRooms} Room(s)</Text>
      </View>
    </View>
  );
});

export default SearchDetails;

const styles = StyleSheet.create({
  container: {
    padding: spacing.extraSmall,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: borderRadius.medium,
    margin: spacing.small,
  },
  detailsWrapper: {
    flexDirection: "row",
    gap: spacing.small,
  },
  location: {
    fontSize: fontSize.small,
    fontFamily: "Rubik_600SemiBold",
  },
  details: {
    fontSize: fontSize.small,
    fontFamily: "Rubik_400Regular",
  },
});
