import React, { useEffect, forwardRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import NumericInput from "react-native-numeric-input";

import { theme } from "helpers";
import { scrollToComponentInScrollView } from "helpers/utils";

const NumberInput = ({ ...props }, ref) => {
  useEffect(() => {
    if (props.errorText && ref && props.scrollViewRef) {
      scrollToComponentInScrollView(props.scrollViewRef, ref);
    }
  }, [props.errorText]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <NumericInput
        upDownButtonsBackgroundColor={
          props.errorText ? theme.colors.error : theme.colors.primary
        }
        rightButtonBackgroundColor={
          props.errorText ? theme.colors.error : theme.colors.primary
        }
        leftButtonBackgroundColor={
          props.errorText ? theme.colors.error : theme.colors.primary
        }
        rounded
        iconStyle={{ color: "white" }}
        autoCapitalize="none"
        onChange={props.onChange}
        {...props}
      ></NumericInput>
      {props.errorText ? (
        <Text style={[styles.error, styles.break]}>{props.errorText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    marginTop: 12,
  },
  label: {
    marginStart: 4,
    marginEnd: 10,
    fontSize: 16,
    marginVertical: 8,
    color: theme.colors.placeholder,
  },
  iconStyle: { color: "white" },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  break: {
    flexBasis: "100%",
    flexGrow: 0,
  },
});

export default forwardRef(NumberInput);
