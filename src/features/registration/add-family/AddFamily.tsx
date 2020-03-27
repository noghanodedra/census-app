import React, { useState, forwardRef, useImperativeHandle } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  BackButton,
  Background,
  CenterSpinner,
  ViewWithTitle,
  TextInput,
  Address,
  Dropdown
} from "components";

import styles from "./styles";
import ScreenNames from "constants/screen-names";
import { View } from "react-native";

const ADD_FAMILY = gql`
  mutation createFamily($family: CreateFamilyInput!) {
    createFamily(data: $family) {
      id
      headName
    }
  }
`;

const AddFamily = ({ navigation, dropDownData }, ref) => {
  const [headName, setHeadName] = useState({
    value: "sdd",
    error: ""
  });
  const [census, setCensus] = useState({
    value: { name: "", id: "0" },
    error: ""
  });
  const [isLoading, setLoading] = useState(false);

  const [createFamily] = useMutation(ADD_FAMILY);
  const address = {
    line1: "",
    line2: "",
    line3: "",
    state: "",
    district: "",
    townCity: "",
    postcode: ""
  };
  const _onAddFamily = () => {
    if (!headName) {
      setHeadName({ ...headName, error: "Invalid head name." });
      return;
    }
    const family = {
      headName: headName.value,
      censusId: Number.parseInt(census.value.id, 10),
      address: address
    };
    return createFamily({ variables: { family } });
  };

  useImperativeHandle(ref, () => ({
    _onAddFamily
  }));

  return (
    <View ref={ref} style={styles.container}>
      <Background>
        <ViewWithTitle title="General Info">
          <TextInput
            label="Head Name"
            returnKeyType="next"
            value={headName.value}
            onChangeText={text => setHeadName({ value: text, error: "" })}
            error={!!headName.error}
            errorText={headName.error}
            autoCapitalize="none"
          />
          <Dropdown
            label="Select census"
            data={dropDownData.censusList}
            dropdownPosition={2}
            onChangeText={value => {
              setCensus({ value: value, error: "" });
            }}
          ></Dropdown>
        </ViewWithTitle>

        <ViewWithTitle title="Address">
          <Address
            addressData={address}
            states={dropDownData.stateList}
          ></Address>
        </ViewWithTitle>

        {/*<Button mode="contained" onPress={_onAddButtonPressed}>
          Add
          </Button>*/}
        {isLoading ? <CenterSpinner overlay="true"></CenterSpinner> : null}
      </Background>
    </View>
  );
};
export default forwardRef(AddFamily);
