import React, { memo } from "react";

import { LandingPage } from "features/landing-page";
import { Background } from "components";

export const DashBoard = ({ navigation }) => {
  return (
    <Background>
      <LandingPage navigation={navigation} />
    </Background>
  );
};

export default memo(DashBoard);
