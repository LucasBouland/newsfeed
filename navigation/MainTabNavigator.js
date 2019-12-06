import React from "react";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import DetailsScreen from "../screens/DetailsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { createAppContainer } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import { createStackNavigator } from "react-navigation-stack";

const newsNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Details: { screen: DetailsScreen }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#f4511e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const tabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: newsNavigator,
      navigationOptions: {
        tabBarLabel: "Accueil",
        tabBarIcon: ({ tintColor }) => (
          <Icon color={tintColor} size={25} name={"ios-home"} />
        )
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: "Paramètres",
        tabBarIcon: ({ tintColor }) => (
          <Icon color={tintColor} size={25} name={"ios-settings"} />
        ),
        barStyle: { backgroundColor: "red" }
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(tabNavigator);
