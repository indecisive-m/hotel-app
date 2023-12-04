import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { QueryClient, QueryClientProvider } from "react-query";
import { Text } from "react-native";

import Settings from "./screens/Settings";
import Explore from "./screens/Explore";

import { StackParamList, TabParamList } from "constants/types";
import Hotel from "screens/Hotel";
import HotelSearchMap from "screens/HotelSearchMap";
import { useEffect } from "react";
import useGetBearerKey from "api/useGetBearerKey";
import { Ionicons } from "@expo/vector-icons";
import CalendarModal from "screens/CalendarModal";

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 600 } },
});

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="search-outline"
              size={26}
              color={focused ? "orange" : "#d3d3d3"}
            />
          ),
          tabBarActiveTintColor: "orange",
          tabBarInactiveTintColor: "#d3d3d3",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings-outline"
              size={26}
              color={focused ? "orange" : "#d3d3d3"}
            />
          ),
          tabBarActiveTintColor: "orange",
          tabBarInactiveTintColor: "#d3d3d3",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Explore"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Hotel" component={Hotel} />
          <Stack.Screen name="HotelSearchMap" component={HotelSearchMap} />
          <Stack.Screen
            name="CalendarModal"
            component={CalendarModal}
            options={{
              presentation: "transparentModal",
              animation: "slide_from_bottom",
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
