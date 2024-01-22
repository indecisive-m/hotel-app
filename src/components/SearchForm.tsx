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

type Props = NativeStackScreenProps<StackParamList, "Explore">;
type SearchFormNavigationProp = Props["navigation"];

const SearchForm = observer(() => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<SearchFormNavigationProp>();
  const isFocused = useIsFocused();

  const [inputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [isFocused]);

  const geoCode = useQuery({
    queryKey: ["search", inputText],
    queryFn: () => useGetGeoCode(inputText),
    enabled: false,
  });

  const showModal = () => {
    navigation.navigate("CalendarModal");
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
        onChangeText={(text) => setInputText(text)}
      />
      <Pressable style={styles.input} onPress={showModal}>
        <Text>
          {store.dates.checkInDate} - {store.dates.checkOutDate}
        </Text>
      </Pressable>
      <TextInput
        placeholder="How many adults"
        style={styles.input}
        keyboardType="number-pad"
      />
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
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    borderRadius: 50,
    backgroundColor: "orange",
    padding: 12,
    justifyContent: "center",
    width: "100%",
  },
  text: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "500",
  },
});