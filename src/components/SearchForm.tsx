import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import useGetGeoCode from "api/useGetGeoCode";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "constants/types";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { store, useMst } from "store";
import { borderRadius, spacing, fontSize } from "constants/styles";

type Props = NativeStackScreenProps<StackParamList, "Explore">;
type SearchFormNavigationProp = Props["navigation"];

const SearchForm = observer(() => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<SearchFormNavigationProp>();
  const isFocused = useIsFocused();

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
  return (
    <>
      <TextInput
        placeholder="Where are you going?"
        style={styles.input}
        value={inputText}
        onChangeText={(text) => handleInputText(text)}
      />
      <Pressable style={styles.input} onPress={showModal}>
        <Text>
          {dates.checkInDate} - {dates.checkOutDate}
        </Text>
      </Pressable>
      <View style={styles.rowInput}>
        <TextInput
          placeholder="How many adults"
          style={styles.inputSplit}
          keyboardType="number-pad"
          onChangeText={(text) => hotel.setNumberOfAdults(Number(text))}
        />
        <TextInput
          placeholder="How many Rooms "
          style={styles.inputSplit}
          keyboardType="number-pad"
          onChangeText={(text) => hotel.setNumberOfRooms(Number(text))}
        />
      </View>
      <Pressable style={styles.button} onPress={() => handleGeoCode()}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.text}>Search</Text>
        )}
      </Pressable>
    </>
  );
});

export default SearchForm;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: borderRadius.large,
    padding: spacing.extraSmall,
    marginBottom: spacing.medium,
  },
  button: {
    borderRadius: borderRadius.circle,
    backgroundColor: "orange",
    padding: spacing.small,
    justifyContent: "center",
    width: "100%",
  },
  text: {
    alignSelf: "center",
    fontSize: fontSize.large,
    fontWeight: "500",
  },
  rowInput: {
    flexDirection: "row",
  },
  inputSplit: {
    width: "50%",
    borderWidth: 1,
    borderRadius: borderRadius.large,
    padding: spacing.extraSmall,
    marginBottom: spacing.medium,
  },
});
