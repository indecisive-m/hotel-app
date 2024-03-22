import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
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
import { collectStoredAnnotations } from "mobx/dist/internal";

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
    borderBottomWidth: 1,
    borderBottomColor: color.accent,
    flex: 2,
    color: color.font,
  };

  const $rowInput: ViewStyle = {
    flexDirection: "row",
    columnGap: spacing.extraSmall,
  };

  const $text: TextStyle = {
    alignSelf: "center",
    fontSize: fontSize.extraLarge,
    fontFamily: "CormorantGaramond_700Bold",
    color: color.font,
  };

  const $input: TextStyle = {
    borderBottomWidth: 1,
    paddingVertical: spacing.small,
    marginBottom: spacing.medium,
    fontFamily: "Rubik_400Regular",
    fontSize: fontSize.small,
    borderBottomColor: color.accent,
    color: color.font,
  };

  const $button: ViewStyle = {
    borderRadius: borderRadius.circle,
    backgroundColor: color.accent,
    padding: spacing.small,
    justifyContent: "center",
    width: "100%",
  };

  const $headerText: TextStyle = {
    fontSize: fontSize.extraLarge,
    fontFamily: "CormorantGaramond_700Bold",
    color: color.font,
  };

  const $inputWrapper: ViewStyle = {
    padding: spacing.small,
  };

  const $inputText: TextStyle = {
    fontSize: fontSize.small,
    fontFamily: "Rubik_400Regular",
    color: color.font,
  };

  return (
    <>
      <View style={$inputWrapper}>
        <Text style={$headerText}>Destination</Text>
        <TextInput
          placeholder="Where are you going?"
          placeholderTextColor={color.accent}
          style={$input}
          value={inputText}
          onChangeText={(text) => handleInputText(text)}
        />
        <Text style={$headerText}>Travel Dates</Text>
        <Pressable style={$input} onPress={showModal}>
          <Text style={$inputText}>
            {dates.checkInDate} - {dates.checkOutDate}
          </Text>
        </Pressable>
      </View>
      <View style={$rowInput}>
        <View style={[$inputWrapper, { flex: 2 }]}>
          <Text style={$headerText}>Adults</Text>
          <TextInput
            placeholder="How many adults"
            placeholderTextColor={color.accent}
            style={[$input, $inputSplit]}
            keyboardType="number-pad"
            onChangeText={(text) => hotel.setNumberOfAdults(Number(text))}
          />
        </View>
        <View style={[$inputWrapper, { flex: 2 }]}>
          <Text style={$headerText}>Rooms</Text>
          <TextInput
            placeholder="How many Rooms "
            placeholderTextColor={color.accent}
            style={[$input, $inputSplit]}
            keyboardType="number-pad"
            onChangeText={(text) => hotel.setNumberOfRooms(Number(text))}
          />
        </View>
      </View>
      <Pressable style={$button} onPress={() => handleGeoCode()}>
        {loading ? (
          <ActivityIndicator size={"large"} color={color.font} />
        ) : (
          <Text style={$text}>Search</Text>
        )}
      </Pressable>
    </>
  );
});

export default SearchForm;
