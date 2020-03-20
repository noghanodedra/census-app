import React, { memo } from "react";
import SafeAreaView from "react-native-safe-area-view";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { CustomAppbar, DrawerContent } from "navigation";
import { LandingPage } from "features";
import styles from "./styles";

const Drawer = createDrawerNavigator();

const MainScreen = ({ ...props }) => {
  console.log(props);
  return (
    <SafeAreaView>
      <CustomAppbar
        navigation={props.navigation}
        previous={null}
      ></CustomAppbar>
      <LandingPage />
    </SafeAreaView>
  );
};

export const Dashboard = ({ navigation }) => {
  return (
    <Drawer.Navigator
      drawerStyle={styles.drawerStyle}
      drawerContent={() => <DrawerContent navigation={navigation} />}
    >
      <Drawer.Screen name="Home" component={MainScreen} />
    </Drawer.Navigator>
  );
};

export default memo(Dashboard);
