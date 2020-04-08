import React, { memo, useState, useRef, useEffect } from "react";
import { View } from "react-native";

import { ProgressSteps, ProgressStep } from "components/progress-steps";
import { Background, CenterSpinner } from "components";
import { showSuccesToast, showErrorToast } from "components/UIUtilities";
import { theme } from "helpers";
import { AddFamily } from "features/registration/add-family";
import { AddIndividual } from "features/registration/add-individual";
import { Summary } from "features/registration/summary";
import ScreenNames from "constants/screen-names";

const Registration = ({ ...props }) => {
  const { data } = props.navigation.state.params;
  const [family, setFamily] = useState({});

  const [state, setState] = useState({
    isValid: false,
    errors: false,
  });

  let addFamilyCompRef = useRef(null);
  let addIndividualCompRef = useRef(null);

  let familyScrollViewRef = useRef(null);
  let individualScrollViewRef = useRef(null);

  const onAddFamily = () => {
    const addFamilyPromise = new Promise<boolean>((resolve, reject) => {
      if (!addFamilyCompRef.current._validateFields()) {
        showErrorToast("Some of the field(s) are invalid.");
        setState({ errors: true, isValid: true });
        reject(false);
        return false;
      }
      addFamilyCompRef.current
        ._onAddFamily()
        .then(({ data }) => {
          setFamily(data.createFamily);
          resolve(true);
          showSuccesToast("Family added.");
        })
        .catch((e) => {
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
        showErrorToast("Some of the field(s) are invalid.");
        setState({ errors: true, isValid: true });
        reject(false);
        return false;
      }
      addIndividualCompRef.current
        ._onAddIndividual()
        .then(({ data }) => {
          showSuccesToast("Individual added.");
          resolve(true);
        })
        .catch((e) => {
          console.error(e);
          setState({ errors: true, isValid: true });
          reject(false);
        });
    });
    return addIndividualPromise;
  };

  const onDone = () => {
    props.navigation.navigate(ScreenNames.DASHBOARD);
  };

  const progressStepsStyle = {
    activeStepIconBorderColor: theme.colors.primary,
    activeLabelColor: theme.colors.primary,
    activeStepNumColor: "white",
    activeStepIconColor: theme.colors.primary,
    completedStepIconColor: theme.colors.primary,
    completedProgressBarColor: theme.colors.primary,
    completedCheckColor: theme.colors.surface,
  };
  const buttonTextStyle = {
    color: theme.colors.surface,
    fontWeight: "600",
  };
  const buttonStyle = {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  };
  const addIndivButtonStyle = {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    marginRight: 5,
  };

  useEffect(() => {
    props.navigation.setParams({
      title: ScreenNames.REGISTRATION,
    });
  }, []);

  return (
    <Background>
      <View style={{ flex: 1, width: "100%", padding: 5, marginTop: -20 }}>
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
            label="Add Family"
            nextBtnText="Add"
            nextBtnStyle={buttonStyle}
            nextBtnTextStyle={buttonTextStyle}
            onNext={onAddFamily}
            errors={state.errors}
            previousBtnStyle={{ display: "none" }}
            scrollViewProps={{ ref: familyScrollViewRef, scrollToTop: true }}
          >
            <AddFamily
              dropDownData={data}
              navigation={props.navigation}
              ref={addFamilyCompRef}
              scrollViewRef={familyScrollViewRef}
            ></AddFamily>
          </ProgressStep>
          <ProgressStep
            label="Add Individual"
            nextBtnText="Add"
            nextBtnStyle={buttonStyle}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnStyle={{ display: "none" }}
            onNext={onAddIndividual}
            errors={state.errors}
            scrollViewProps={{
              ref: individualScrollViewRef,
              scrollToTop: true,
            }}
          >
            <AddIndividual
              dropDownData={data}
              family={family}
              navigation={props.navigation}
              ref={addIndividualCompRef}
              scrollViewRef={individualScrollViewRef}
            ></AddIndividual>
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
            <Summary family={family} navigation={props.navigation}></Summary>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </Background>
  );
};
export default memo(Registration);
