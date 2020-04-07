import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

import { theme } from "helpers";

const Modal = ({ children, ...props }) => {
  const _hideDialog = () => {
    props.setVisible(false);
  };

  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={_hideDialog}>
        <Dialog.Title style={styles.title}>
          {props.title ? props.title : "Modal"}
        </Dialog.Title>
        <Dialog.Content>{children}</Dialog.Content>
        <Dialog.Actions>
          <Button onPress={_hideDialog} mode="contained">
            {props.closeButtonText ? props.closeButtonText : "Close"}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.surface,
    paddingStart: 25,
    padding: 5,
    marginEnd: 0,
    marginStart: 0,
    marginTop: 0,
    marginBottom: 10,
  },
});

export default memo(Modal);
