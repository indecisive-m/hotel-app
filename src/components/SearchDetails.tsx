import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { useMst } from "store";
import { observer } from "mobx-react-lite";

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
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    margin: 10,
  },
  detailsWrapper: {
    flexDirection: "row",
    gap: 10,
  },
  location: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    fontSize: 12,
  },
});
