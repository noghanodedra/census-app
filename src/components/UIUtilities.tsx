import React from "react";
import Toast from "react-native-tiny-toast";
import { theme } from "helpers";

export const showSuccesToast = async (message: string) => {
  Toast.showSuccess(message, {
    position: Toast.position.CENTER,
    containerStyle: { backgroundColor: theme.colors.primary },
    textStyle: {},
    duration: 4000,
  });
};

export const showErrorToast = async (
  message: string,
  duration: number = 3000
) => {
  Toast.show(message, {
    position: Toast.position.CENTER,
    containerStyle: {
      minWidth: 200,
      minHeight: 60,
      backgroundColor: "black",
    },
    textStyle: { color: theme.colors.error },
    duration: duration,
  });
};

export default { showSuccesToast, showErrorToast };
