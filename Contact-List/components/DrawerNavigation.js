import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import React from "react";
import Contacts from "../screens/Contacts";
import Favorites from "../screens/Favorites";
import User from "../screens/User";
import { Ionicons } from "@expo/vector-icons";
import colors from "../utils/colors";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Contacts">
      <Drawer.Screen
        name="Contacts"
        component={Contacts}
        options={{
          drawerIcon: ({ focused }) => {
            return (
              <Ionicons
                name="list"
                size={24}
                color={focused ? colors.blue : colors.greyDark}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Faves"
        component={Favorites}
        options={{
          drawerIcon: ({ focused }) => {
            return (
              <Ionicons
                name="star"
                size={24}
                color={focused ? colors.blue : colors.greyDark}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="User"
        component={User}
        options={{
          drawerIcon: ({ focused }) => {
            return (
              <Ionicons
                name="person"
                size={24}
                color={focused ? colors.blue : colors.greyDark}
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
