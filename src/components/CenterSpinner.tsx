import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { theme } from "helpers";

const CenterSpinner = ({ ...props }) => (
  <View
    style={[
      styles.container,
      styles.horizontal,
      props.overlay ? styles.overlay : null
    ]}
  >
    <ActivityIndicator size="large" color={theme.colors.primary} {...props} />
  </View>
);

export default memo(CenterSpinner);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
