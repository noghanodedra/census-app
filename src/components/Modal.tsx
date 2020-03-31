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
          <Button onPress={_hideDialog}>
            {props.closeButtonText ? props.closeButtonText : "Close"}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    color: theme.colors.primary
  }
});

export default memo(Modal);
