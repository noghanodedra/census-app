import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  Background,
  ViewWithTitle,
  TextInput,
  Address,
  Dropdown,
} from "components";

import styles from "./styles";
import { View } from "react-native";

const ADD_FAMILY = gql`
  mutation createFamily($family: CreateFamilyInput!) {
    createFamily(data: $family) {
      id
      headName
    }
  }
`;

const AddFamily = ({ navigation, dropDownData, scrollViewRef }, ref) => {
  const [headName, setHeadName] = useState({
    value: "test",
    error: "",
  });
  const [census, setCensus] = useState({
    value: { name: "", id: "0" },
    error: "",
  });
  const [createFamily] = useMutation(ADD_FAMILY);

  let addressCompRef = useRef(null);

  const address = {
    line1: "",
    line2: "",
    line3: "",
    state: "",
    district: "",
    townCity: "",
    postcode: "",
  };

  const _validateFields = () => {
    if (!headName.value) {
      setHeadName({ ...headName, error: "Please enter head name." });
      return false;
    }
    if (!census.value || !census.value.name) {
      setCensus({ ...census, error: "Please select census." });
      return false;
    }
    return addressCompRef.current._validateFields();
  };

  const _onAddFamily = () => {
    const family = {
      headName: headName.value,
      censusId: Number.parseInt(census.value.id, 10),
      address: address,
    };
    return createFamily({ variables: { family } });
  };

  useImperativeHandle(ref, () => ({
    _onAddFamily,
    _validateFields,
  }));

  return (
    <View ref={ref} style={styles.container}>
      <Background>
        <ViewWithTitle title="General Info">
          <TextInput
            label="Head Name"
            returnKeyType="next"
            value={headName.value}
            onChangeText={(text) => setHeadName({ value: text, error: "" })}
            error={!!headName.error}
            errorText={headName.error}
            autoCapitalize="none"
            scrollViewRef={scrollViewRef}
            ref={React.createRef()}
          />
          <Dropdown
            label="Select census"
            data={dropDownData.censusList}
            dropdownPosition={2}
            onChangeText={(value) => {
              setCensus({ value: value, error: "" });
            }}
            error={!!census.error}
            errorText={census.error}
            scrollViewRef={scrollViewRef}
            ref={React.createRef()}
          ></Dropdown>
        </ViewWithTitle>

        <ViewWithTitle title="Address">
          <Address
            addressData={address}
            states={dropDownData.stateList}
            scrollViewRef={scrollViewRef}
            ref={addressCompRef}
          ></Address>
        </ViewWithTitle>
      </Background>
    </View>
  );
};
export default forwardRef(AddFamily);
