import React, { memo } from "react";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Text, View } from "react-native";

import { Button } from "components";
import { theme } from "helpers";

const AuthErrorModal = ({ ...props }) => (
  <Modal style={styles.modal} isVisible={props.isModalVisible}>
    <View style={styles.container}>
      <Text style={styles.message}>{props.message}</Text>
      <Button mode="outlined" onPress={props.toggleModal}>
        Ok
      </Button>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  container: {
    flex: 1,
    padding: 20,
    margin: 20,
    backgroundColor: "white"
  },
  message: {
    margin: 20,
    fontSize: 16,
    color: theme.colors.error
  }
});

export default memo(AuthErrorModal);
