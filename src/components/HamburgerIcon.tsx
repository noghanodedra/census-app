import React from "react";
import { withNavigation } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/SimpleLineIcons";
const HamburgerIcon = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{
        width: 44,
        height: 44,
        marginLeft: 20
      }}
      onPress={() => {
        navigation.openDrawer();
      }}
    >
      <Icon name="menu" size={20} color="black" />
    </TouchableOpacity>
  );
};
export default withNavigation(HamburgerIcon);
