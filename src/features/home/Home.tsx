import React, { memo } from "react";

import { Button, Background, Header, Logo, Paragraph } from "components";
import ScreenNames from "constants/screen-names";

const Home = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Census</Header>

    <Paragraph>The population register.</Paragraph>
    <Button
      mode="contained"
      onPress={() => navigation.navigate(ScreenNames.LOGIN)}
    >
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate(ScreenNames.SIGN_UP)}
    >
      Sign Up
    </Button>
  </Background>
);

export default memo(Home);
