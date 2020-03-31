import React, { memo, useState, useRef } from "react";
import { View } from "react-native";

import { ProgressSteps, ProgressStep } from "components/progress-steps";
import { Background, BackButton, CenterSpinner } from "components";
import { theme } from "helpers";
import { AddFamily } from "features/registration/add-family";
import { AddIndividual } from "features/registration/add-individual";
import { Summary } from "features/registration/summary";

import styles from "./styles";

const Registration = ({ ...props }) => {
  const { data } = props.route.params;
  const [family, setFamily] = useState({});

  const [state, setState] = useState({
    isValid: false,
    errors: false
  });

  let addFamilyCompRef = useRef(null);
  let addIndividualCompRef = useRef(null);
  const onAddFamily = () => {
    const addFamilyPromise = new Promise<boolean>((resolve, reject) => {
      if (!addFamilyCompRef.current._validateFields()) {
        console.log("invalid family...form");
        setState({ errors: true, isValid: true });
        reject(false);
        return false;
      }
      addFamilyCompRef.current
        ._onAddFamily()
        .then(({ data }) => {
          setFamily(data.createFamily);
          resolve(true);
          console.log("added family");
        })
        .catch(e => {
          console.error(e);
          setState({ errors: true, isValid: true });
          reject(false);
        });
    });
    return addFamilyPromise;
  };

  const onAddIndividual = () => {
    const addIndividualPromise = new Promise<boolean>((resolve, reject) => {
      if (!addIndividualCompRef.current._validateFields()) {
        console.log("invlaid indiv");
        setState({ errors: true, isValid: true });
        reject(false);
        return false;
      }
      addIndividualCompRef.current
        ._onAddIndividual()
        .then(({ data }) => {
          console.log("indiv addded.....");
          //console.log(data);
          setTimeout(() => {
            resolve(true);
          }, 2000);
        })
        .catch(e => {
          console.error(e);
          setState({ errors: true, isValid: true });
          reject(false);
        });
    });
    return addIndividualPromise;
  };

  const onDone = () => {
    props.navigation.jumpTo("Home");
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
    backgroundColor: theme.colors.primary,
    borderRadius: 5
  };
  const addIndivButtonStyle = {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    // padding: 10,
    //marginLeft: -35,
    marginRight: 5
  };

  return (
    <Background>
      <BackButton goBack={props.navigation.goBack} />
      <View style={{ marginTop: 10 }}>
        <ProgressSteps {...progressStepsStyle}>
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
            finishBtnText="Done"
            previousBtnText="Add individual"
            nextBtnStyle={buttonStyle}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnStyle={addIndivButtonStyle}
            previousBtnTextStyle={buttonTextStyle}
            onSubmit={onDone}
            errors={state.errors}
          >
            <View style={{ alignItems: "center" }}>
              <Summary family={family} navigation={props.navigation}></Summary>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </Background>
  );
};
export default memo(Registration);
