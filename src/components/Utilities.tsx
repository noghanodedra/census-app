import React from "react";
import Toast from "react-native-tiny-toast";
import { theme } from "helpers";

export const showSuccesToast = (message) => {
  Toast.showSuccess(message, {
    position: 20,
    containerStyle: {},
    textStyle: {},
    duration: 3000,
  });
};

export const showErrorToast = (message) => {
  Toast.show(message, {
    position: 20,
    containerStyle: {},
    textStyle: {},
    duration: 3000,
  });
};

export default {};
