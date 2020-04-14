import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB as PaperFAB } from "react-native-paper";

import { theme } from "helpers";

const FAB = ({ ...props }) => {
  return (
    <PaperFAB style={[styles.fab, props.style]} icon={props.icon} {...props} />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    backgroundColor: theme.colors.primary
  }
});

export default FAB;
