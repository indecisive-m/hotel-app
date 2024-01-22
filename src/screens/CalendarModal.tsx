import { Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar, CalendarUtils, DateData } from "react-native-calendars";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList, Hotel, HotelList, GeoCode } from "../constants/types";
import { useMemo, useState } from "react";
import Toast from "react-native-toast-message";
import { observer } from "mobx-react-lite";
import { useMst } from "store";

type Props = NativeStackScreenProps<StackParamList, "CalendarModal">;

const CalendarModal = observer(({ navigation }: Props) => {
  const [markedDates, setMarkedDates] = useState<string[]>([]);

  const dateToday = CalendarUtils.getCalendarDateString(new Date());
  const { dates } = useMst();

  const [minDate, setMinDate] = useState(dateToday);

  const dayPress = (day: DateData) => {
    if (
      markedDates.length > 2 ||
      markedDates[0] > day.dateString ||
      day.dateString === dateToday
    ) {
      setMarkedDates([day.dateString]);
      dates.setCheckInDate(day.dateString);
      dates.setCheckOutDate("");

      console.log("refreshing list");
    } else {
      setMarkedDates((prev) => [...prev, day.dateString]);
      dates.setCheckInDate(day.dateString);
      dates.setCheckOutDate("");
    }
  };

  const getDaysInBetween = (firstDay: string, secondDay: string) => {
    const daysArray = [firstDay];

    for (let i = firstDay; i !== secondDay; ) {
      const date = new Date(i);
      const newDate = date.setDate(date.getDate() + 1);
      const newDay = CalendarUtils.getCalendarDateString(newDate);
      daysArray.push(newDay);
      setMarkedDates(daysArray);
      i = newDay;
    }
  };

  if (markedDates.length === 2) {
    dates.setCheckInDate(markedDates[0]);
    dates.setCheckOutDate(markedDates[1]);
    const checkInDate = new Date(markedDates[0]);
    const checkOutDate = new Date(markedDates[1]);

    const timeDifference = checkInDate.getTime() - checkOutDate.getTime();

    const nights = Math.abs(Math.round(timeDifference / (1000 * 3600 * 24)));
    if (nights > 31) {
      Toast.show({
        type: "error",
        text1: "Max stay is 31 nights",
        position: "bottom",
      });
      setMarkedDates([markedDates[0]]);
    } else {
      console.log("running days ");
      getDaysInBetween(markedDates[0], markedDates[1]);
    }
  }

  const marked = useMemo(() => {
    type Marks = {
      [key: string]: {
        color: string;
        startingDay?: boolean;
        endingDay?: boolean;
        textColor?: string;
      };
    };
    const marks: Marks = {};
    markedDates.map((day, index) => {
      if (index === 0) {
        marks[`${markedDates[0]}`] = {
          color: "hsl(38.82352941176471, 100%, 50%)",
          startingDay: true,
        };
      } else if (index === markedDates.length - 1) {
        marks[`${markedDates[index]}`] = {
          color: "hsl(38.82352941176471, 100%, 50%)",
          endingDay: true,
        };
      } else {
        marks[`${markedDates[index]}`] = {
          color: "hsl(38.82352941176471, 100%, 60%)",
          textColor: "black",
        };
      }
    });

    return marks;
  }, [markedDates]);

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
        onDayPress={dayPress}
        markingType="period"
        markedDates={marked}
        minDate={minDate}
      />
    </View>
  );
});

export default CalendarModal;

const styles = StyleSheet.create({});
