import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Contacts from "./screens/Contacts";
import Profile from "./screens/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./components/TabNavigator";
import DrawerNavigation from "./components/DrawerNavigation";
import Options from "./screens/Options";
import * as Linking from "expo-linking";

const Stack = createStackNavigator();

const prefix = Linking.createURL("/");
const config = {
  screens: {
    Tabs: "/",
    Profile: "contact",
  },
};

export default function App() {
  const linking = {
    prefixes: [prefix],
    config,
  };
  return (
    <NavigationContainer linking={linking}>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Drawer">
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerBackTitleVisible: false }}
        />
        <Stack.Screen
          name="Options"
          component={Options}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
