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
import BackButton from "./BackButton";

const SearchDetails = observer(() => {
  const { dates, hotel, searchDestination } = useMst();
  const { theme } = useContext(ThemeContext);
  const color = theme === "dark" ? darkTheme : lightTheme;

  const $container: ViewStyle = {
    padding: spacing.small,
    borderRadius: borderRadius.medium,
    margin: spacing.small,
    backgroundColor: color.secondary,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.small,
  };

  const $detailsWrapper: ViewStyle = {
    flexDirection: "row",
    gap: spacing.small,
  };

  const $location: TextStyle = {
    fontSize: fontSize.small,
    fontFamily: "Rubik_600SemiBold",
    color: color.font,
  };

  const $details: TextStyle = {
    fontSize: fontSize.small,
    fontFamily: "Rubik_400Regular",
    color: color.font,
  };
  return (
    <View style={$container}>
      <View>
        <BackButton />
      </View>
      <View>
        <Text style={$location}>{searchDestination.searchDestination}</Text>
        <View style={$detailsWrapper}>
          <Text style={$details}>
            {dates.checkInDate} - {dates.checkOutDate}
          </Text>
          <Text style={$details}>{hotel.numberOfAdults} Adults</Text>
          <Text style={$details}>{hotel.numberOfRooms} Room(s)</Text>
        </View>
      </View>
    </View>
  );
});

export default SearchDetails;
