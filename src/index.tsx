import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import { AuthNavigation, AppNavigation } from "navigation";

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigation,
    App: AppNavigation,
  },
  {
    initialRouteName: "Auth",
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
// localization
//https://lokalise.com/blog/react-native-localization/