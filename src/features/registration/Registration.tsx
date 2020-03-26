import React, { memo } from "react";
import { ProgressSteps, ProgressStep } from "components/progress-steps";
import { Background, BackButton, CenterSpinner } from "components";
import { View, Text } from "react-native";
import { theme } from "helpers";
import { AddFamily } from "features/registration/add-family";
import ScreenNames from "constants/screen-names";
import styles from "./styles";

const Registration = ({ ...props }) => {
  console.log(props);
  //props.navigation.route.params.data;
  console.log("nav", props.route);
  const { data } = props.route.params;
  console.log("data", data);

  const state = {
    isValid: false,
    errors: false
  };

  const onNextStep = () => {
    if (!this.state.isValid) {
      this.setState({ errors: true });
    } else {
      this.setState({ errors: false });
    }
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

      <View style={{ marginTop: 10 }}>
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
            label="Add Family"
            nextBtnStyle={buttonStyle}
            previousBtnStyle={buttonStyle}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
          >
            <View style={{ alignItems: "center" }}>
              <AddFamily
                dropDownData={data}
                navigation={props.navigation}
              ></AddFamily>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Add Individual"
            nextBtnStyle={buttonStyle}
            previousBtnStyle={buttonStyle}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
          >
            <View style={{ alignItems: "center" }}>
              <Text>This is the content within step 2!</Text>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Summary"
            nextBtnStyle={buttonStyle}
            previousBtnStyle={buttonStyle}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
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
