import React, { memo, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import {
  Button,
  BackButton,
  Background,
  CenterSpinner,
  Header,
  Logo,
  TextInput
} from "components";

import {
  emailValidator,
  passwordValidator,
  extractGQLErrorMessage,
  setUser
} from "helpers/utils";
import styles from "./styles";
import ScreenNames from "constants/screen-names";

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      profile {
        firstName
        lastName
        email
        lastLoggedIn
      }
    }
  }
`;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "test@test.com", error: "" });
  const [password, setPassword] = useState({ value: "test", error: "" });
  const [isLoading, setLoading] = useState(false);

  const [login] = useMutation(LOGIN_USER);

  const _onLoginPressed = (e: any) => {
    e.preventDefault();
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    setLoading(true);
    login({ variables: { email: email.value, password: password.value } })
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
        setUser(data.login.profile);
        navigation.navigate(ScreenNames.DASHBOARD);
      })
      .catch(e => {
        console.log(extractGQLErrorMessage(e));
        console.log(e);
        if (e.networkError) {
          console.log("Erro na requisição.");
        } else {
          e.graphQLErrors.forEach(err => {
            console.log(err.message);
          });
        }
        // If the error message contains email or password we'll assume that's the error.
        if (/email/i.test(e.message)) {
          //this.setState({ emailError: true });
        }
        if (/password/i.test(e.message)) {
          //this.setState({ passwordError: true });
        }
        setLoading(false);
      });
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate(ScreenNames.HOME)} />

      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      {/*
      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>*/}
      {isLoading ? <CenterSpinner overlay="true"></CenterSpinner> : null}
    </Background>
  );
};
export default memo(Login);
