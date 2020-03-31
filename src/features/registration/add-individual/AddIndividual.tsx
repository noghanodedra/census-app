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

const AddIndividual = ({ navigation, dropDownData, family }, ref) => {
  const [createIndividual] = useMutation(ADD_INDIVIDUAL);

  const [name, setName] = useState({
    value: "hekk",
    error: ""
  });
  const [age, setAge] = useState({
    value: 5,
    error: ""
  });
  const [educationYears, setEducationYears] = useState({
    value: 5,
    error: ""
  });
  const [hoursPerWeek, setHoursPerWeek] = useState({
    value: 5,
    error: ""
  });
  const [education, setEducation] = useState({
    value: 0,
    error: ""
  });

  const [workClass, setWorkClass] = useState({
    value: 0,
    error: ""
  });

  const [occupation, setOccupation] = useState({
    value: 0,
    error: ""
  });

  const [relationship, setRelationship] = useState({
    value: 0,
    error: ""
  });

  const [caste, setCaste] = useState({
    value: 0,
    error: ""
  });

  const [gender, setGender] = useState({
    value: 0,
    error: ""
  });

  const [incomeClass, setIncomeClass] = useState({
    value: 0,
    error: ""
  });

  const [maritalStatus, setMaritalStatus] = useState({
    value: 0,
    error: ""
  });

  const _validateFields = () => {
    if (!name.value) {
      setName({ ...name, error: "Please enter the name." });
      return false;
    }

    if (!age.value) {
      setAge({ ...age, error: "Please enter the age." });
      return false;
    }

    if (!hoursPerWeek.value) {
      setHoursPerWeek({
        ...hoursPerWeek,
        error: "Please enter the hours per week."
      });
      return false;
    }

    if (!educationYears.value) {
      setEducationYears({
        ...educationYears,
        error: "Please enter the education years."
      });
      return false;
    }

    if (education.value === 0) {
      setEducation({ ...education, error: "Please select education." });
      return false;
    }

    if (workClass.value === 0) {
      setWorkClass({ ...workClass, error: "Please select work class." });
      return false;
    }

    if (occupation.value === 0) {
      setOccupation({ ...occupation, error: "Please select occupation." });
      return false;
    }

    if (relationship.value === 0) {
      setRelationship({
        ...relationship,
        error: "Please select relationship."
      });
      return false;
    }

    if (caste.value === 0) {
      setCaste({
        ...caste,
        error: "Please select caste."
      });
      return false;
    }

    if (gender.value === 0) {
      setGender({
        ...gender,
        error: "Please select gender."
      });
      return false;
    }

    if (incomeClass.value === 0) {
      setGender({
        ...incomeClass,
        error: "Please select income class."
      });
      return false;
    }

    return true;
  };

  const _onAddIndividual = () => {
    const individual = {
      name: name.value,
      age: age.value,
      educationYears: educationYears.value,
      hoursPerWeek: hoursPerWeek.value,
      educationId: education.value,
      workClassId: workClass.value,
      occupationId: occupation.value,
      relationshipId: relationship.value,
      casteId: caste.value,
      genderId: gender.value,
      familyId: Number.parseInt(family.id, 10),
      incomeClassId: incomeClass.value,
      maritalStatusId: maritalStatus.value
    };
    return createIndividual({ variables: { individual } });
  };

  useImperativeHandle(ref, () => ({
    _onAddIndividual,
    _validateFields
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
            onChange={text =>
              setAge({
                value: Number.parseInt(text, 10),
                error: ""
              })
            }
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
            onChange={text =>
              setHoursPerWeek({ value: Number.parseInt(text, 10), error: "" })
            }
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
            onChange={text =>
              setEducationYears({ value: Number.parseInt(text, 10), error: "" })
            }
            error={!!educationYears.error}
            errorText={educationYears.error}
            autoCapitalize="none"
          />
          <Dropdown
            label="Select education"
            data={dropDownData.educationList}
            dropdownPosition={2}
            onChangeText={value => {
              setEducation({ value: Number.parseInt(value.id, 10), error: "" });
            }}
            error={!!education.error}
            errorText={education.error}
          ></Dropdown>
          <Dropdown
            label="Select work-class"
            data={dropDownData.workClassList}
            dropdownPosition={2}
            onChangeText={value => {
              setWorkClass({ value: Number.parseInt(value.id, 10), error: "" });
            }}
            error={!!workClass.error}
            errorText={workClass.error}
          ></Dropdown>
          <Dropdown
            label="Select occupation"
            data={dropDownData.occupationList}
            dropdownPosition={2}
            onChangeText={value => {
              setOccupation({
                value: Number.parseInt(value.id, 10),
                error: ""
              });
            }}
            error={!!occupation.error}
            errorText={occupation.error}
          ></Dropdown>
          <Dropdown
            label="Select relationship"
            data={dropDownData.relationshipList}
            dropdownPosition={2}
            onChangeText={value => {
              setRelationship({
                value: Number.parseInt(value.id, 10),
                error: ""
              });
            }}
            error={!!relationship.error}
            errorText={relationship.error}
          ></Dropdown>
          <Dropdown
            label="Select caste"
            data={dropDownData.casteList}
            dropdownPosition={2}
            onChangeText={value => {
              setCaste({ value: Number.parseInt(value.id, 10), error: "" });
            }}
            error={!!caste.error}
            errorText={caste.error}
          ></Dropdown>
          <Dropdown
            label="Select gender"
            data={dropDownData.genderList}
            dropdownPosition={2}
            onChangeText={value => {
              setGender({ value: Number.parseInt(value.id, 10), error: "" });
            }}
            error={!!gender.error}
            errorText={gender.error}
          ></Dropdown>
          <Dropdown
            label="Select income-class"
            data={dropDownData.incomeClassList}
            dropdownPosition={2}
            onChangeText={value => {
              setIncomeClass({
                value: Number.parseInt(value.id, 10),
                error: ""
              });
            }}
            error={!!incomeClass.error}
            errorText={incomeClass.error}
          ></Dropdown>
          <Dropdown
            label="Select marital-status"
            data={dropDownData.maritalStatusList}
            dropdownPosition={2}
            onChangeText={value => {
              setMaritalStatus({
                value: Number.parseInt(value.id, 10),
                error: ""
              });
            }}
            error={!!maritalStatus.error}
            errorText={maritalStatus.error}
          ></Dropdown>
        </ViewWithTitle>
      </Background>
    </View>
  );
};
export default forwardRef(AddIndividual);
