import { Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList, Hotel, HotelList, GeoCode } from "../constants/types";
import React from "react";

type Props = NativeStackScreenProps<StackParamList, "CalendarModal">;

const CalendarModal = ({ navigation }: Props) => {
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

      <Calendar style={{ height: "50%" }} />
    </View>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({});
