import React, { memo, useContext } from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { DrawerActions } from "react-navigation-drawer";

import { theme } from "helpers";
import { HeaderTitleContext } from "contexts";

const CustomAppbar = ({ previous, navigation }) => {
  const { headerTitle } = useContext(HeaderTitleContext);
  const { state } = navigation;
  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.primary } }}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.pop}
          color={theme.colors.primary}
        />
      ) : (
        <Appbar.Action
          icon={state.isDrawerOpen ? "close" : "menu"}
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}
        />
      )}
      <Appbar.Content title={headerTitle} />
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
    fontWeight: "bold",
    fontSize: 16,
    color: theme.colors.secondary,
  },
});

export default memo(CustomAppbar);
