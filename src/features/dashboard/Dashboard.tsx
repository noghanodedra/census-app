import React, { memo } from "react";
import { LandingPage } from "features/landing-page";

export const DashBoard = ({ navigation }) => {
  return <LandingPage navigation={navigation} />;
};

export default memo(DashBoard);
