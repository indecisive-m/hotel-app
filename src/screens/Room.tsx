import { StyleSheet, Text, View } from "react-native";
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

  // console.log(data?.data?.offers);
  // console.log(data?.data?.offers?.room);
  console.log(data?.data?.offers);
  return (
    <View>
      <Text>Room</Text>
      <Text>Room description</Text>
      <Text>{roomId}</Text>
    </View>
  );
};

export default Room;

const styles = StyleSheet.create({});
