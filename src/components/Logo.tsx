import React, { memo } from "react";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { theme } from "helpers";

const Logo = () => (
  <Ionicons name="md-people" size={80} color={theme.colors.primary} />
);

const styles = StyleSheet.create({});

export default memo(Logo);
