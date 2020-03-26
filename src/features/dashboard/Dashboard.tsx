import React, { memo } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { CustomAppbar, DrawerContent } from "navigation";
import { LandingPage } from "features/landing-page";
import { Registration } from "features/registration";

import ScreenNames from "constants/screen-names";
import styles from "./styles";
import { View } from "react-native";

const Drawer = createDrawerNavigator();

const MainScreen = ({ ...props }) => {
  const navigateToReg = data => {
    console.log("data", data);
    props.navigation.navigate(ScreenNames.REGISTRATION, { data });
  };

  return (
    <View>
      <CustomAppbar
        navigation={props.navigation}
        previous={null}
      ></CustomAppbar>
      <LandingPage
        navigation={props.navigation}
        navigationCallBack={navigateToReg}
      />
    </View>
  );
};

export const DashBoard = ({ navigation }) => {
  return (
    <Drawer.Navigator
      drawerStyle={styles.drawerStyle}
      drawerContent={() => <DrawerContent navigation={navigation} />}
    >
      <Drawer.Screen name="Home" component={MainScreen} />
      <Drawer.Screen name="Registration" component={Registration} />
    </Drawer.Navigator>
  );
};

export default memo(DashBoard);
