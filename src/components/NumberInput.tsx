import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import NumericInput from "react-native-numeric-input";

import { theme } from "helpers";

const NumberInput = ({ ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <NumericInput
        upDownButtonsBackgroundColor={theme.colors.primary}
        rightButtonBackgroundColor={theme.colors.primary}
        leftButtonBackgroundColor={theme.colors.primary}
        rounded
        iconStyle={{ color: "white" }}
        onChange={props.onChange}
        {...props}
      ></NumericInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 12
  },
  label: {
    marginStart: 4,
    marginEnd: 10,
    fontSize: 16,
    marginVertical: 8,
    color: theme.colors.placeholder
  },
  iconStyle: { color: "white" }
});

export default NumberInput;
