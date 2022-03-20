import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import Contacts from "../screens/Contacts";
import Favorites from "../screens/Favorites";
import User from "../screens/User";
import { Ionicons } from "@expo/vector-icons";
import colors from "../utils/colors";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarInactiveTintColor: colors.greyDark,
      }}
    >
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          tabBarIcon: ({ focused }) => {
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
      <Tab.Screen
        name="Faves"
        component={Favorites}
        options={{
          tabBarIcon: ({ focused }) => {
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
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({ focused }) => {
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
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
