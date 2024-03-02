import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import useGetGeoCode from "api/useGetGeoCode";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "constants/types";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { store, useMst } from "store";
import {
  borderRadius,
  spacing,
  fontSize,
  darkTheme,
  lightTheme,
} from "constants/styles";
import { ThemeContext } from "constants/context";

type Props = NativeStackScreenProps<StackParamList, "Explore">;
type SearchFormNavigationProp = Props["navigation"];

const SearchForm = observer(() => {
  const { theme } = useContext(ThemeContext);
  const queryClient = useQueryClient();
  const navigation = useNavigation<SearchFormNavigationProp>();
  const isFocused = useIsFocused();

  const color = theme === "dark" ? darkTheme : lightTheme;

  const [inputText, setInputText] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const { hotel, dates, searchDestination } = useMst();

  useEffect(() => {
    setLoading(false);
    setInputText(searchDestination.searchDestination);
  }, [isFocused]);

  const geoCode = useQuery({
    queryKey: ["search", inputText],
    queryFn: () => useGetGeoCode(inputText),
    enabled: false,
  });

  const showModal = () => {
    navigation.navigate("CalendarModal");
  };

  const handleInputText = (text: string) => {
    setInputText(text);
    searchDestination.setSearchDestination(text);
  };

  const handleGeoCode = () => {
    setLoading(true);
    const hotelList = new Promise((resolve) => resolve(geoCode.refetch()));

    hotelList.then((value) => {
      const hotels = value?.data;
      navigation.navigate("HotelSearchMap", {
        hotelList: hotels.data,
      });
    });
  };

  const $inputSplit: TextStyle = {
    width: "50%",
    borderWidth: 1,
    borderRadius: borderRadius.large,
    padding: spacing.extraSmall,
    marginBottom: spacing.medium,
  };

  const $rowInput: ViewStyle = {
    flexDirection: "row",
  };

  const $text: TextStyle = {
    alignSelf: "center",
    fontSize: fontSize.large,
    fontWeight: "500",
  };

  const $input: ViewStyle = {
    borderWidth: 1,
    borderRadius: borderRadius.large,
    padding: spacing.extraSmall,
    marginBottom: spacing.medium,
  };

  const $button: ViewStyle = {
    borderRadius: borderRadius.circle,
    backgroundColor: color.accent400,
    padding: spacing.small,
    justifyContent: "center",
    width: "100%",
  };

  return (
    <>
      <TextInput
        placeholder="Where are you going?"
        style={$input}
        value={inputText}
        onChangeText={(text) => handleInputText(text)}
      />
      <Pressable style={$input} onPress={showModal}>
        <Text>
          {dates.checkInDate} - {dates.checkOutDate}
        </Text>
      </Pressable>
      <View style={$rowInput}>
        <TextInput
          placeholder="How many adults"
          style={$inputSplit}
          keyboardType="number-pad"
          onChangeText={(text) => hotel.setNumberOfAdults(Number(text))}
        />
        <TextInput
          placeholder="How many Rooms "
          style={$inputSplit}
          keyboardType="number-pad"
          onChangeText={(text) => hotel.setNumberOfRooms(Number(text))}
        />
      </View>
      <Pressable style={$button} onPress={() => handleGeoCode()}>
        {loading ? <ActivityIndicator /> : <Text style={$text}>Search</Text>}
      </Pressable>
    </>
  );
});

export default SearchForm;
