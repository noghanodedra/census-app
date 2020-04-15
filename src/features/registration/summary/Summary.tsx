import React, { memo } from "react";
import { View } from "react-native";

import FamilyContainer from "./components/FamilyContainer";
import styles from "./styles";

const Summary = ({ family }) => {
  return (
    <View style={styles.container}>
      <FamilyContainer family={family} />
    </View>
  );
};
export default memo(Summary);
