import React, { memo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { theme } from "helpers";

const ViewWithTitle = ({ children, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title ? props.title : ""}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    width: "100%",
    flexDirection: "column",
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderRadius: 3
  },
  title: {
    color: theme.colors.primary,
    backgroundColor: theme.colors.surface,
    marginStart: 4,
    paddingStart: 6,
    paddingEnd: 6,
    position: "absolute",
    top: -10,
    left: 0
  }
});

export default memo(ViewWithTitle);
