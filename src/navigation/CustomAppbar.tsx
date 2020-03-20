import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

import { theme } from "helpers";

const CustomAppbar = ({ previous, navigation }) => {
  const title = "Home";
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
            navigation.openDrawer();
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
    flexDirection: "row"
  },
  content: {
    textAlign: "center",
    color: theme.colors.secondary
  }
});

export default memo(CustomAppbar);
