import React, { memo, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  BackButton,
  Background,
  CenterSpinner,
  ViewWithTitle,
  TextInput,
  Address
} from "components";

import styles from "./styles";
import ScreenNames from "constants/screen-names";

const ADD_FAMILY = gql`
  mutation createFamily($family: CreateFamilyInput) {
    createFamily(data: $family) {
      headName
    }
  }
`;

const AddFamily = ({ navigation, dropDownData }) => {
  const [headName, setHeadName] = useState({
    value: "",
    error: ""
  });
  const [isLoading, setLoading] = useState(false);

  const [createFamily] = useMutation(ADD_FAMILY);

  const _onAddButtonPressed = (e: any) => {
    e.preventDefault();

    if (!headName) {
      setHeadName({ ...headName, error: "Invalid head name." });
      return;
    }
    setLoading(true);
  };

  return (
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
      </ViewWithTitle>

      <ViewWithTitle title="Address">
        <Address states={dropDownData.stateList}></Address>
      </ViewWithTitle>

      <Button mode="contained" onPress={_onAddButtonPressed}>
        Add
      </Button>
      {isLoading ? <CenterSpinner overlay="true"></CenterSpinner> : null}
    </Background>
  );
};
export default memo(AddFamily);
