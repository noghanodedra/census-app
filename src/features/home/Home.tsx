import React, { memo } from "react";
import { Button, Background, Header, Logo, Paragraph } from "components";
import styles from "./styles";
import ScreenNames from "constants/screen-names";

const Home = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Census - The register</Header>

    <Paragraph>
      The easiest way to start with your amazing application.
    </Paragraph>
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
