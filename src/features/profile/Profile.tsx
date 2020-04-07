import React, { memo } from "react";
import styles from "./styles";
import { View, Text } from "react-native";

const Profile = ({ ...props }) => {
  return (
    <View>
      <Text> {"profile"}</Text>
    </View>
  );
};

export default memo(Profile);
