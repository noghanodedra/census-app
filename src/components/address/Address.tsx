import React, { useState, forwardRef, useImperativeHandle } from "react";
import { TextInput, Dropdown } from "components";

import styles from "./styles";
import { View } from "react-native";

const Address = ({ ...props }, ref) => {
  const [districts, setDistricts] = useState([]);
  const [line1, setLine1] = useState({ value: "erer", error: "" });
  const [line2, setLine2] = useState({ value: "re", error: "" });
  const [line3, setLine3] = useState({ value: "er", error: "" });
  const [state, setState] = useState({ value: { name: "" }, error: "" });
  const [district, setDistrict] = useState({ value: { name: "" }, error: "" });
  const [townCity, setTownCity] = useState({ value: "trttrtr", error: "" });
  const [postcode, setPostcode] = useState({ value: "454545", error: "" });

  const { addressData } = props;

  addressData.line1 = line1.value;
  addressData.line2 = line2.value;
  addressData.line3 = line3.value;
  addressData.state = state.value.name;
  addressData.district = district.value.name;
  addressData.postcode = postcode.value;
  addressData.townCity = townCity.value;

  const _validateFields = () => {
    if (!line1.value) {
      setLine1({ ...line1, error: "Please enter Line1." });
      return false;
    }
    if (!townCity.value) {
      setTownCity({ ...townCity, error: "Please enter Town/Village/City." });
      return false;
    }
    if (!state.value || !state.value.name) {
      setState({ ...state, error: "Please select state." });
      return false;
    }
    if (!district.value || !district.value.name) {
      setDistrict({ ...district, error: "Please select district." });
      return false;
    }
    if (!postcode.value) {
      setPostcode({ ...postcode, error: "Please enter postcode." });
      return false;
    }
    return true;
  };

  useImperativeHandle(ref, () => ({
    _validateFields,
  }));

  return (
    <View style={styles.container} ref={ref}>
      <TextInput
        label="Line 1"
        returnKeyType="next"
        value={line1.value}
        onChangeText={(text) => setLine1({ value: text, error: "" })}
        error={!!line1.error}
        errorText={line1.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Line 2 (Optional)"
        returnKeyType="next"
        value={line2.value}
        onChangeText={(text) => setLine2({ value: text, error: "" })}
        error={!!line2.error}
        errorText={line2.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Line 3 (Optional)"
        returnKeyType="next"
        value={line3.value}
        onChangeText={(text) => setLine3({ value: text, error: "" })}
        error={!!line3.error}
        errorText={line3.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Town/Village/City"
        returnKeyType="next"
        value={townCity.value}
        onChangeText={(text) => setTownCity({ value: text, error: "" })}
        error={!!townCity.error}
        errorText={townCity.error}
        autoCapitalize="none"
      />
      <Dropdown
        label="Select state"
        data={props.states}
        onChangeText={(value) => {
          console.log(value);
          setDistricts(value.districts);
          setState({ value: value, error: "" });
        }}
        error={!!state.error}
        errorText={state.error}
      ></Dropdown>
      <Dropdown
        label="Select district"
        data={districts}
        dropdownPosition={2}
        onChangeText={(value) => {
          setDistrict({ value: value, error: "" });
        }}
        error={!!district.error}
        errorText={district.error}
      ></Dropdown>
      <TextInput
        label="Postcode"
        returnKeyType="next"
        value={postcode.value}
        onChangeText={(text) => setPostcode({ value: text, error: "" })}
        error={!!postcode.error}
        errorText={postcode.error}
        autoCapitalize="none"
      />
    </View>
  );
};

export default forwardRef(Address);
