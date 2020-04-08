import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { theme } from "helpers";
import { UserInfo, LogoutDrawerItem } from "components";
import ScreenNames from "constants/screen-names";
import { HeaderTitleContext } from "contexts";

const DrawerContent = ({ ...props }) => {
  const { setHeaderTitle } = useContext(HeaderTitleContext);

  return (
    <DrawerContentScrollView {...props}>
      <UserInfo />
      <View style={styles.drawerContent}>
        <Drawer.Section>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            )}
            label="Home"
            onPress={() => {
              setHeaderTitle("Home");
              props.navigation.navigate(ScreenNames.DASHBOARD);
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Profile"
            onPress={() => {
              setHeaderTitle(ScreenNames.PROFILE);
              props.navigation.navigate(ScreenNames.PROFILE);
            }}
          />

          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="tune" color={color} size={size} />
            )}
            label="Preferences"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={color}
                size={size}
              />
            )}
            label="Bookmarks"
            onPress={() => {}}
          />
        </Drawer.Section>
        <Drawer.Section>
          <LogoutDrawerItem
            navigation={props.navigation}
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="logout" color={color} size={size} />
            )}
            label="Logout"
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};
export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 10,
    fontWeight: "bold",
    color: theme.colors.secondary,
  },
  drawerItem: {
    color: theme.colors.secondary,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  drawerSection: {
    marginTop: 10,
  },
});
