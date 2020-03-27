import React, { memo, useState, useRef } from "react";
import { View, Text } from "react-native";

import { ProgressSteps, ProgressStep } from "components/progress-steps";
import { Background, BackButton, Header, CenterSpinner } from "components";
import { theme } from "helpers";
import { AddFamily } from "features/registration/add-family";
import { AddIndividual } from "features/registration/add-individual";
import styles from "./styles";

const Registration = ({ ...props }) => {
  const { data } = props.route.params;
  const [step, setStep] = useState(0);
  const [family, setFamily] = useState({});

  const [state, setState] = useState({
    isValid: false,
    errors: false
  });

  let addFamilyCompRef = useRef(null);
  let addIndividualCompRef = useRef(null);
  const onAddFamily = () => {
    addFamilyCompRef.current
      ._onAddFamily()
      .then(({ data }) => {
        setFamily(data.createFamily);
      })
      .catch(e => {
        console.error(e);
        setState({ errors: true, isValid: true });
      });
  };

  const onAddIndividual = () => {
    addIndividualCompRef.current
      ._onAddIndividual()
      .then(({ data }) => {
        console.log(data);
        //setFamily(data.createFamily);
      })
      .catch(e => {
        console.error(e);
        setState({ errors: true, isValid: true });
      });
  };

  const progressStepsStyle = {
    activeStepIconBorderColor: theme.colors.primary,
    activeLabelColor: theme.colors.primary,
    activeStepNumColor: "white",
    activeStepIconColor: theme.colors.primary,
    completedStepIconColor: theme.colors.primary,
    completedProgressBarColor: theme.colors.primary,
    completedCheckColor: theme.colors.surface
  };
  const buttonTextStyle = {
    color: theme.colors.surface,
    fontWeight: "600"
  };
  const buttonStyle = {
    backgroundColor: theme.colors.primary
  };

  return (
    <Background>
      <BackButton goBack={props.navigation.goBack} />
      <Header>Registration</Header>
      <View style={{ marginTop: 10 }}>
        <ProgressSteps {...progressStepsStyle} activeStep={step}>
          <ProgressStep
            label="Add Family"
            nextBtnText="Add"
            nextBtnStyle={buttonStyle}
            nextBtnTextStyle={buttonTextStyle}
            onNext={onAddFamily}
            errors={state.errors}
            previousBtnStyle={{ display: "none" }}
          >
            <View style={{ alignItems: "center" }}>
              <AddFamily
                dropDownData={data}
                navigation={props.navigation}
                ref={addFamilyCompRef}
              ></AddFamily>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Add Individual"
            nextBtnText="Add"
            nextBtnStyle={buttonStyle}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnStyle={{ display: "none" }}
            onNext={onAddIndividual}
            errors={state.errors}
          >
            <View style={{ alignItems: "center" }}>
              <AddIndividual
                dropDownData={data}
                family={family}
                navigation={props.navigation}
                ref={addIndividualCompRef}
              ></AddIndividual>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Summary"
            nextBtnText="Done!"
            nextBtnStyle={buttonStyle}
            nextBtnTextStyle={buttonTextStyle}
            //previousBtnStyle={{ display: "none" }}
          >
            <View style={{ alignItems: "center" }}>
              <Text>This is the content within step 3!</Text>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </Background>
  );
};
export default memo(Registration);
