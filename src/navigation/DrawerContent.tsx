import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EventRegister } from "react-native-event-listeners";

import { theme } from "helpers";
import { UserInfo, LogoutDrawerItem, AuthErrorModal } from "components";
import ScreenNames from "constants/screen-names";
import EventNames from "constants/event-names";
import { HeaderTitleContext } from "contexts";

const DrawerContent = ({ ...props }) => {
  const { setCurrentHeaderTitle } = useContext(HeaderTitleContext);
  const [showModal, setShowModal] = useState(false);

  EventRegister.addEventListener(EventNames.UNAUTHORISED_ACCESS, data => {
    setShowModal(true);
  });

  const toggleModal = () => {
    setShowModal(false);
    props.navigation.navigate(ScreenNames.AUTH);
  };

  return (
    <DrawerContentScrollView {...props}>
      <UserInfo />
      <AuthErrorModal
        isModalVisible={showModal}
        toggleModal={toggleModal}
        message="Session expired. Please login again."
      ></AuthErrorModal>
      <View style={styles.drawerContent}>
        <Drawer.Section>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            )}
            label="Home"
            onPress={() => {
              setCurrentHeaderTitle("Home");
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
              setCurrentHeaderTitle(ScreenNames.PROFILE);
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
    flex: 1
  },
  userInfoSection: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    marginTop: 10,
    fontWeight: "bold",
    color: theme.colors.secondary
  },
  drawerItem: {
    color: theme.colors.secondary
  },
  caption: {
    fontSize: 14,
    lineHeight: 14
  },
  drawerSection: {
    marginTop: 10
  }
});
