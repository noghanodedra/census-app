import React from "react";
import { View } from "react-native";

const ProgressButtons = props => (
  <View style={{ flexDirection: "row", marginTop: 40 }}>
    <View style={{ position: "absolute", left: 16, bottom: -20 }}>
      {props.renderPreviousButton()}
    </View>
    <View style={{ position: "absolute", right: 16, bottom: -20 }}>
      {props.renderNextButton()}
    </View>
  </View>
);

export default ProgressButtons;
