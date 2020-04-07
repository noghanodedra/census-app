import React, { memo, useState } from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { DrawerActions } from "react-navigation-drawer";

import { theme } from "helpers";

const CustomAppbar = ({ previous, title, navigation }) => {
  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.primary } }}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.pop}
          color={theme.colors.primary}
        />
      ) : (
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}
        />
      )}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appbar: {
    fontSize: 26,
    backgroundColor: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 14,
    flexDirection: "row",
  },
  content: {
    textAlign: "center",
    color: theme.colors.secondary,
  },
});

export default memo(CustomAppbar);
