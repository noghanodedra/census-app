import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown as MaterialDropdown } from "react-native-material-dropdown";
import { theme } from "helpers";

const Dropdown = ({ ...props }) => {
  return (
    <View style={styles.container}>
      <MaterialDropdown
        style={[styles.dropdown, props.style]}
        {...props}
        valueExtractor={item => item}
        labelExtractor={({ name }) => name}
        inputContainerStyle={[
          props.inputContainerStyle,
          styles.inputContainerStyle
        ]}
        itemTextStyle={[props.itemTextStyle, styles.itemTextStyle]}
        containerStyle={[props.containerStyle, styles.containerStyle]}
        dropdownOffset={{ top: 16, left: 5 }}
        dropdownPosition={0}
        itemCount={5}
        pickerStyle={styles.pickerStyle}
        underlineColor="transparent"
        mode="outlined"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 12
  },
  dropdown: {
    paddingHorizontal: 4,
    paddingTop: 4,
    fontSize: 14
  },
  inputContainerStyle: {
    borderBottomColor: "transparent"
  },
  containerStyle: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.54)",
    padding: 5
  },
  itemTextStyle: {
    color: theme.colors.placeholder,
    backgroundColor: theme.colors.surface
  },
  pickerStyle: {
    borderBottomColor: "transparent",
    borderWidth: 0,
    backgroundColor: theme.colors.surface
  }
});

export default Dropdown;
