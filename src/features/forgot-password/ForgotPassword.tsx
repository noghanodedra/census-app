import React, { memo, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { emailValidator } from "helpers/utils";
import {
  Button,
  BackButton,
  Background,
  Header,
  Logo,
  TextInput
} from "components";
import ScreenNames from "constants/screen-names";

import styles from "./styles";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });

  const _onSendPressed = () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    navigation.navigate(ScreenNames.LOGIN);
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate(ScreenNames.LOGIN)} />

      <Logo />

      <Header>Restore Password</Header>

      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
        Send Reset Instructions
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate(ScreenNames.LOGIN)}
      >
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>
    </Background>
  );
};

export default memo(ForgotPassword);
