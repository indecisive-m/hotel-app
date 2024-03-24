import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { QueryClient, QueryClientProvider } from "react-query";

import Settings from "./screens/Settings";
import Explore from "./screens/Explore";

import { StackParamList, TabParamList } from "constants/types";
import Hotel from "screens/Hotel";
import HotelSearchMap from "screens/HotelSearchMap";
import { useContext, useEffect, useState } from "react";
import useGetBearerKey from "api/useGetBearerKey";
import { Ionicons } from "@expo/vector-icons";
import CalendarModal from "screens/CalendarModal";
import Room from "screens/Room";
import Error from "screens/Error";
import Toast from "react-native-toast-message";
import {
  useFonts,
  Rubik_300Light,
  Rubik_300Light_Italic,
  Rubik_400Regular,
  Rubik_400Regular_Italic,
  Rubik_500Medium,
  Rubik_500Medium_Italic,
  Rubik_600SemiBold,
  Rubik_600SemiBold_Italic,
  Rubik_700Bold,
  Rubik_700Bold_Italic,
  Rubik_800ExtraBold,
  Rubik_800ExtraBold_Italic,
  Rubik_900Black,
  Rubik_900Black_Italic,
} from "@expo-google-fonts/rubik";
import {
  CormorantGaramond_300Light,
  CormorantGaramond_300Light_Italic,
  CormorantGaramond_400Regular,
  CormorantGaramond_400Regular_Italic,
  CormorantGaramond_500Medium,
  CormorantGaramond_500Medium_Italic,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_600SemiBold_Italic,
  CormorantGaramond_700Bold,
  CormorantGaramond_700Bold_Italic,
} from "@expo-google-fonts/cormorant-garamond";
import * as SplashScreen from "expo-splash-screen";
import { Provider, store } from "store";
import ReviewsModal from "screens/ReviewsModal";
import { ThemeContext } from "constants/context";
import { darkTheme, fontSize, lightTheme, spacing } from "constants/styles";
import BackButton from "components/BackButton";

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1800 * 1000, retry: 2 } },
});

function HomeTabs() {
  const { theme } = useContext(ThemeContext);
  const color = theme === "dark" ? darkTheme : lightTheme;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: color.neutral,
          borderTopWidth: 0,
          height: spacing.massive,
          shadowColor: "transparent",
        },
        tabBarActiveTintColor: color.accent,
        tabBarInactiveTintColor: color.font,

        tabBarLabelStyle: {
          fontFamily: "CormorantGaramond_700Bold",
          fontSize: fontSize.small,
          paddingBottom: spacing.extraSmall,
        },
      }}
    >
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="search-outline"
              size={26}
              color={focused ? color.accent : color.font}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: true,
          headerTitleStyle: {
            fontFamily: "CormorantGaramond_700Bold",
            fontSize: fontSize.extraLarge,
            color: color.font,
          },
          headerStyle: {
            backgroundColor: color.neutral,
          },
          headerShadowVisible: false,

          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings-outline"
              size={26}
              color={focused ? color.accent : color.font}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const { fetchBearerKey } = useGetBearerKey();
  const [theme, setTheme] = useState<Theme>("light");
  const value = { theme, setTheme };
  const color = theme === "dark" ? darkTheme : lightTheme;
  type Theme = "light" | "dark";

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
    fetchBearerKey();
  }, []);

  const [fontsLoaded] = useFonts({
    Rubik_300Light,
    Rubik_300Light_Italic,
    Rubik_400Regular,
    Rubik_400Regular_Italic,
    Rubik_500Medium,
    Rubik_500Medium_Italic,
    Rubik_600SemiBold,
    Rubik_600SemiBold_Italic,
    Rubik_700Bold,
    Rubik_700Bold_Italic,
    Rubik_800ExtraBold,
    Rubik_800ExtraBold_Italic,
    Rubik_900Black,
    Rubik_900Black_Italic,

    CormorantGaramond_300Light,
    CormorantGaramond_300Light_Italic,
    CormorantGaramond_400Regular,
    CormorantGaramond_400Regular_Italic,
    CormorantGaramond_500Medium,
    CormorantGaramond_500Medium_Italic,
    CormorantGaramond_600SemiBold,
    CormorantGaramond_600SemiBold_Italic,
    CormorantGaramond_700Bold,
    CormorantGaramond_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <ThemeContext.Provider value={value}>
      <Provider value={store}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: color.neutral,
                },
                headerTitleStyle: {
                  color: color.font,
                  fontFamily: "CormorantGaramond_700Bold",
                  fontSize: fontSize.large,
                },
                headerLeft: () => <BackButton />,
              }}
            >
              <Stack.Screen
                name="Explore"
                component={HomeTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Hotel"
                component={Hotel}
                options={{
                  headerTitle: "",
                  headerShadowVisible: false,
                }}
              />
              <Stack.Screen
                name="Room"
                component={Room}
                options={{ title: "Room Details" }}
              />
              <Stack.Screen
                name="HotelSearchMap"
                component={HotelSearchMap}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="Error"
                component={Error}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CalendarModal"
                component={CalendarModal}
                options={{
                  presentation: "transparentModal",
                  animation: "slide_from_bottom",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ReviewsModal"
                component={ReviewsModal}
                options={{
                  presentation: "modal",
                  animation: "slide_from_bottom",
                  headerShown: true,
                  headerTitleStyle: {
                    fontFamily: "CormorantGaramond_700Bold",
                    fontSize: fontSize.extraLarge,
                    color: color.font,
                  },
                  headerStyle: {
                    backgroundColor: color.neutral,
                  },

                  headerShadowVisible: false,
                }}
              />
            </Stack.Navigator>
            <Toast />
          </NavigationContainer>
        </QueryClientProvider>
      </Provider>
    </ThemeContext.Provider>
  );
}
