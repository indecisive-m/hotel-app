import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { QueryClient, QueryClientProvider } from "react-query";

import Settings from "./screens/Settings";
import Home from "./screens/Home";

import { StackParamList, TabParamList } from "constants/types";
import Hotel from "screens/Hotel";

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60000 } },
});

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeTabs} />
          <Stack.Screen name="Hotel" component={Hotel} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
