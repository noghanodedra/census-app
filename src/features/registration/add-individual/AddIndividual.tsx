import React, { useState, forwardRef, useImperativeHandle } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  Background,
  ViewWithTitle,
  TextInput,
  NumberInput,
  Dropdown
} from "components";

import styles from "./styles";
import { View } from "react-native";

const ADD_INDIVIDUAL = gql`
  mutation createIndividual($individual: CreateIndividualInput!) {
    createIndividual(data: $individual) {
      id
    }
  }
`;

const AddIndividual = ({ navigation, dropDownData }, ref) => {
  const [createIndividual] = useMutation(ADD_INDIVIDUAL);

  const [name, setName] = useState({
    value: "sdd",
    error: ""
  });
  const [age, setAge] = useState({
    value: "",
    error: ""
  });
  const [educationYears, setEducationYears] = useState({
    value: "",
    error: ""
  });
  const [hoursPerWeek, setHoursPerWeek] = useState({
    value: "",
    error: ""
  });
  const [education, setEducation] = useState({
    value: {},
    error: ""
  });

  const [workClass, setWorkClass] = useState({
    value: {},
    error: ""
  });

  const [occupation, setOccupation] = useState({
    value: {},
    error: ""
  });

  const [relationship, setRelationship] = useState({
    value: {},
    error: ""
  });

  const [caste, setCaste] = useState({
    value: {},
    error: ""
  });

  const [gender, setGender] = useState({
    value: {},
    error: ""
  });

  const [incomeClass, setIncomeClass] = useState({
    value: {},
    error: ""
  });

  const [maritalStatus, setMaritalStatus] = useState({
    value: {},
    error: ""
  });

  const _onAddIndividual = () => {
    const family = {
      censusId: Number.parseInt("0", 10)
    };
    return createIndividual({ variables: { family } });
  };

  useImperativeHandle(ref, () => ({
    _onAddIndividual
  }));

  return (
    <View ref={ref} style={styles.container}>
      <Background>
        <ViewWithTitle title="General Info">
          <TextInput
            label="Name"
            returnKeyType="next"
            value={name.value}
            onChangeText={text => setName({ value: text, error: "" })}
            error={!!name.error}
            errorText={name.error}
            autoCapitalize="none"
          />
          <NumberInput
            label="Age"
            returnKeyType="next"
            value={age.value}
            valueType="real"
            minValue={0}
            maxValue={110}
            onChange={text => setAge({ value: text, error: "" })}
            error={!!age.error}
            errorText={age.error}
          />
          <NumberInput
            label="Hours per week"
            returnKeyType="next"
            type="up-down"
            minValue={0}
            maxValue={100}
            value={hoursPerWeek.value}
            onChange={text => setHoursPerWeek({ value: text, error: "" })}
            error={!!hoursPerWeek.error}
            errorText={hoursPerWeek.error}
            autoCapitalize="none"
          />
          <NumberInput
            label="Education Years"
            returnKeyType="next"
            type="up-down"
            minValue={0}
            maxValue={30}
            value={educationYears.value}
            onChange={text => setEducationYears({ value: text, error: "" })}
            error={!!educationYears.error}
            errorText={educationYears.error}
            autoCapitalize="none"
          />
          <Dropdown
            label="Select education"
            data={dropDownData.educationList}
            dropdownPosition={2}
            onChangeText={value => {
              setEducation({ value: value, error: "" });
            }}
          ></Dropdown>
          <Dropdown
            label="Select work-class"
            data={dropDownData.workClassList}
            dropdownPosition={2}
            onChangeText={value => {
              setWorkClass({ value: value, error: "" });
            }}
          ></Dropdown>
          <Dropdown
            label="Select occupation"
            data={dropDownData.occupationList}
            dropdownPosition={2}
            onChangeText={value => {
              setOccupation({ value: value, error: "" });
            }}
          ></Dropdown>
          <Dropdown
            label="Select relationship"
            data={dropDownData.relationshipList}
            dropdownPosition={2}
            onChangeText={value => {
              setRelationship({ value: value, error: "" });
            }}
          ></Dropdown>
          <Dropdown
            label="Select caste"
            data={dropDownData.casteList}
            dropdownPosition={2}
            onChangeText={value => {
              setCaste({ value: value, error: "" });
            }}
          ></Dropdown>
          <Dropdown
            label="Select gender"
            data={dropDownData.genderList}
            dropdownPosition={2}
            onChangeText={value => {
              setGender({ value: value, error: "" });
            }}
          ></Dropdown>
          <Dropdown
            label="Select income-class"
            data={dropDownData.incomeClassList}
            dropdownPosition={2}
            onChangeText={value => {
              setIncomeClass({ value: value, error: "" });
            }}
          ></Dropdown>
          <Dropdown
            label="Select marital-status"
            data={dropDownData.maritalStatusList}
            dropdownPosition={2}
            onChangeText={value => {
              setMaritalStatus({ value: value, error: "" });
            }}
          ></Dropdown>
        </ViewWithTitle>
      </Background>
    </View>
  );
};
export default forwardRef(AddIndividual);
