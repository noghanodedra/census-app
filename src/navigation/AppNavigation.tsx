import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

import { CustomAppbar, DrawerContent } from "navigation";
import { Registration } from "features/registration";
import { DashBoard } from "features/dashboard";
import { Profile } from "features/profile";
import ScreenNames from "constants/screen-names";

const DrawerNavigator = createDrawerNavigator(
  {
    DashBoard: {
      screen: DashBoard,
    },
    Profile: {
      screen: Profile,
    },
    Registration: {
      screen: Registration,
    },
  },
  {
    contentComponent: DrawerContent,
    drawerType: "slide",
    initialRouteName: ScreenNames.DASHBOARD,
  }
);

const AppNavigation = createStackNavigator({
  DrawerNavigator: {
    screen: DrawerNavigator,
    navigationOptions: ({ navigation }) => {
      return {
        header: (props) => (
          <CustomAppbar previous={null} navigation={navigation}></CustomAppbar>
        ),
      };
    },
  },
});

export default AppNavigation;
