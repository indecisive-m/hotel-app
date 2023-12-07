import { Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList, Hotel, HotelList, GeoCode } from "../constants/types";
import { useMemo, useState } from "react";

type Props = NativeStackScreenProps<StackParamList, "CalendarModal">;

const CalendarModal = ({ navigation }: Props) => {
  const [markedDates, setMarkedDates] = useState([]);

  const [selected, setSelected] = useState<string>();

  console.log(markedDates);

  const date = new Date();

  const day = date.getDate();

  date.setDate(day + 20);

  const newDate = date.getDate();

  console.log(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

  const marked = useMemo(() => {
    return {
      [markedDates[0]]: {
        color: "green",
        startingDay: true,
        disableTouchEvent: true,
      },
      [selected]: { color: "green", disableTouchEvent: true },
    };
  }, [selected]);

  return (
    <View style={{ justifyContent: "flex-end", flex: 1 }}>
      <Pressable
        style={{ flex: 1 }}
        onPress={() => navigation.goBack()}
      ></Pressable>
      <View
        style={{
          height: 20,
          backgroundColor: "orange",
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            height: 6,
            width: 100,
            borderRadius: 100,
          }}
        />
      </View>

      <Calendar
        style={{ height: "50%" }}
        onDayPress={(day) => {
          setSelected(day.dateString),
            setMarkedDates([...markedDates, day.dateString]);
        }}
        markingType="period"
        markedDates={marked}
      />
    </View>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({});
