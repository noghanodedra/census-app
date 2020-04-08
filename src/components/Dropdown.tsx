import React, { useEffect, forwardRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown as MaterialDropdown } from "react-native-material-dropdown";

import { scrollToComponentInScrollView } from "helpers/utils";
import { theme } from "helpers";

const Dropdown = ({ ...props }, ref) => {
  useEffect(() => {
    if (props.errorText && ref && props.scrollViewRef) {
      scrollToComponentInScrollView(props.scrollViewRef, ref);
    }
  });

  return (
    <View style={styles.container} ref={ref}>
      <MaterialDropdown
        style={[styles.dropdown, props.style]}
        {...props}
        valueExtractor={(item) => item}
        labelExtractor={({ name }) => name}
        inputContainerStyle={[
          props.inputContainerStyle,
          styles.inputContainerStyle,
        ]}
        itemTextStyle={[props.itemTextStyle, styles.itemTextStyle]}
        containerStyle={[
          props.containerStyle,
          styles.containerStyle,
          !!props.errorText && { borderColor: "rgb(241, 58, 89)" },
        ]}
        dropdownOffset={{ top: 16, left: 5 }}
        dropdownPosition={0}
        itemCount={3}
        pickerStyle={styles.pickerStyle}
        underlineColor="transparent"
        mode="outlined"
      />
      {props.errorText ? (
        <Text style={styles.error}>{props.errorText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 12,
  },
  dropdown: {
    paddingHorizontal: 4,
    paddingTop: 4,
    fontSize: 14,
  },
  inputContainerStyle: {
    borderBottomColor: "transparent",
  },
  containerStyle: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.54)",
    //borderColor: "rgb(241, 58, 89)", //red
    padding: 5,
  },
  itemTextStyle: {
    color: theme.colors.placeholder,
    backgroundColor: theme.colors.surface,
  },
  pickerStyle: {
    borderBottomColor: "transparent",
    borderWidth: 0,
    backgroundColor: theme.colors.surface,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default forwardRef(Dropdown);
