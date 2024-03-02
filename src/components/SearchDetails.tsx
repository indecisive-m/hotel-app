import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import React, { useContext } from "react";

import { useMst } from "store";
import { observer } from "mobx-react-lite";
import {
  borderRadius,
  darkTheme,
  fontSize,
  lightTheme,
  spacing,
} from "constants/styles";
import { ThemeContext } from "constants/context";

const SearchDetails = observer(() => {
  const { dates, hotel, searchDestination } = useMst();
  const { theme } = useContext(ThemeContext);
  const color = theme === "dark" ? darkTheme : lightTheme;

  const $container: ViewStyle = {
    padding: spacing.extraSmall,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: borderRadius.medium,
    margin: spacing.small,
  };

  const $detailsWrapper: ViewStyle = {
    flexDirection: "row",
    gap: spacing.small,
  };

  const $location: TextStyle = {
    fontSize: fontSize.small,
    fontFamily: "Rubik_600SemiBold",
  };

  const $details: TextStyle = {
    fontSize: fontSize.small,
    fontFamily: "Rubik_400Regular",
  };
  return (
    <View style={$container}>
      <Text style={$location}>{searchDestination.searchDestination}</Text>
      <View style={$detailsWrapper}>
        <Text style={$details}>
          {dates.checkInDate} - {dates.checkOutDate}
        </Text>
        <Text style={$details}>{hotel.numberOfAdults} Adults</Text>
        <Text style={$details}>{hotel.numberOfRooms} Room(s)</Text>
      </View>
    </View>
  );
});

export default SearchDetails;
