import React, { memo } from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Ionicons from "react-native-vector-icons/Ionicons";
import { theme } from "helpers";

const BackButton = ({ goBack }) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    <Ionicons name="md-arrow-back" size={28} color={theme.colors.primary} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10 + getStatusBarHeight(),
    left: 5,
    zIndex: 999,
  },
});

export default memo(BackButton);
