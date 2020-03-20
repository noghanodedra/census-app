import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { Home, Login, SignUp, ForgotPassword, DashBoard } from "features";

const Router = createStackNavigator(
  {
    Home,
    Login,
    SignUp,
    ForgotPassword,
    DashBoard
  },
  {
    initialRouteName: "DashBoard", //"DashBoard",//'Home',
    headerMode: "none"
  }
);

export default createAppContainer(Router);
