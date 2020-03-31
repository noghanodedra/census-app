import React from "react";
import { View } from "react-native";

const ProgressButtons = props => (
  <View style={{ flexDirection: "row", marginTop: 60 }}>
    <View style={{ position: "absolute", left: 40, bottom: 50 }}>
      {props.renderPreviousButton()}
    </View>
    <View style={{ position: "absolute", right: 40, bottom: 50 }}>
      {props.renderNextButton()}
    </View>
  </View>
);

export default ProgressButtons;
