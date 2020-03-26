import React, { memo, useState } from "react";
import { TextInput, Dropdown } from "components";

import styles from "./styles";
import { View } from "react-native";

const Address = ({ ...props }) => {
  const [districts, setDistricts] = useState([]);

  const [line1, setLine1] = useState({ value: "", error: "" });
  const [line2, setLine2] = useState({ value: "", error: "" });
  const [line3, setLine3] = useState({ value: "", error: "" });
  const [state, setState] = useState({ value: "", error: "" });
  const [district, setDistrict] = useState({ value: "", error: "" });
  const [townCity, setTownCity] = useState({ value: "", error: "" });
  const [postcode, setPostcode] = useState({ value: "", error: "" });
  let data = [
    {
      value: "Banana"
    },
    {
      value: "Mango"
    },
    {
      value: "Pear"
    }
  ];

  return (
    <View style={styles.container}>
      <TextInput
        label="Line 1"
        returnKeyType="next"
        value={line1.value}
        onChangeText={text => setLine1({ value: text, error: "" })}
        error={!!line1.error}
        errorText={line1.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Line 2 (Optional)"
        returnKeyType="next"
        value={line2.value}
        onChangeText={text => setLine2({ value: text, error: "" })}
        error={!!line2.error}
        errorText={line2.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Line 3 (Optional)"
        returnKeyType="next"
        value={line3.value}
        onChangeText={text => setLine3({ value: text, error: "" })}
        error={!!line3.error}
        errorText={line3.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Town/Village/City"
        returnKeyType="next"
        value={townCity.value}
        onChangeText={text => setTownCity({ value: text, error: "" })}
        error={!!townCity.error}
        errorText={townCity.error}
        autoCapitalize="none"
      />
      <Dropdown
        label="Select state"
        data={props.states}
        onChangeText={value => {
          console.log("change", value);
          setDistricts(value.districts);
          setDistrict({ value: value, error: "" });
        }}
      ></Dropdown>
      <Dropdown
        label="Select district"
        data={districts}
        dropdownPosition={2}
        onChangeText={value => {
          console.log("change", value);
          setState({ value: value, error: "" });
        }}
      ></Dropdown>
      <TextInput
        label="Postcode"
        returnKeyType="next"
        value={postcode.value}
        onChangeText={text => setPostcode({ value: text, error: "" })}
        error={!!postcode.error}
        errorText={postcode.error}
        autoCapitalize="none"
      />
    </View>
  );
};

export default memo(Address);
