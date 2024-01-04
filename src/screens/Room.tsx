import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "constants/types";
import { useQuery } from "react-query";
import useGetRoomDetails from "api/useGetRoomDetails";

type Props = NativeStackScreenProps<StackParamList, "Room">;

const Room = ({ route, navigation }: Props) => {
  const { roomId } = route.params;

  const { data, isLoading, status, isSuccess, refetch } = useQuery({
    queryKey: ["room", roomId],
    queryFn: () => useGetRoomDetails(roomId),
  });

  const totalPrice = data?.data?.price?.total;
  const roomDescription = data?.data?.description?.text;
  const roomTax = data?.data?.price?.taxes[0]?.amount;
  const roomTaxCode = data?.data?.price?.taxes[0]?.code;

  if (data) {
    console.log(totalPrice);
    console.log(roomDescription);
    console.log(roomTax);
    console.log(roomTaxCode);
  }

  return (
    <View>
      <Text>{roomId}</Text>
      <Text>Room images</Text>
      <Text>Room description</Text>
      <Text>Beds</Text>
      <Text>Price</Text>
      <Pressable>
        <Text>Book this room</Text>
      </Pressable>
    </View>
  );
};

export default Room;

const styles = StyleSheet.create({});
