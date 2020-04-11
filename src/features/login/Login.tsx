import React, { memo, useState, useContext } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  BackButton,
  Background,
  Header,
  Logo,
  TextInput
} from "components";
import { LoadingContext } from "contexts";
import { emailValidator, passwordValidator, setUser } from "helpers/utils";
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
  const [email, setEmail] = useState({
    value: "test@test.com",
    error: ""
  });
  const [password, setPassword] = useState({
    value: "test",
    error: ""
  });
  const { showLoading, hideLoading } = useContext(LoadingContext);

  const [
    login,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(LOGIN_USER);



  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({
        ...email,
        error: emailError
      });
      setPassword({
        ...password,
        error: passwordError
      });
      return;
    }
    showLoading();
    console.log(new Date());
    login({
      variables: {
        email: email.value,
        password: password.value
      },
      fetchPolicy: "no-cache"
    })
      .then(({ data }) => {
        console.log(new Date());
        //console.log(data);
        hideLoading();
        setUser(data.login.profile);
        navigation.navigate(ScreenNames.APP);
      })
      .catch(e => {
        console.log(e);
        hideLoading();
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
        onChangeText={text =>
          setPassword({
            value: text,
            error: ""
          })
        }
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenNames.FORGOT_PASSWORD)}
        >
          <Text style={styles.label}>Forgot password?</Text>
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
    </Background>
  );
};
export default memo(Login);
