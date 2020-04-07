import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import { Home, Login, SignUp, ForgotPassword, DashBoard } from "features";

const AuthNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    ForgotPassword: { screen: ForgotPassword },
    DashBoard: { screen: DashBoard },
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
  }
);

export default AuthNavigation;
