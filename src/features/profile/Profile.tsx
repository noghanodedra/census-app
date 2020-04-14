import React, { memo, useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Title, Caption } from "react-native-paper";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { Background, ViewWithTitle, TextInput, Button } from "components";
import {  showSuccesToast } from "components/UIUtilities";
import {
  getUser,
  passwordValidator,
} from "helpers/utils";
import { LoadingContext } from "contexts";
import styles from "./styles";

const CHANGE_PASSWORD = gql`
  mutation changePassword(
    $email: String!
    $password: String!
    $newPassword: String!
  ) {
    changePassword(
      email: $email
      password: $password
      newPassword: $newPassword
    )
  }
`;

const Profile = ({ ...props }) => {
  const [user, setUser] = useState(null);
  const { showLoading, hideLoading } = useContext(LoadingContext);

  const [showChangePassword, setShowChangePassword] = useState(false);

  const [currPassword, setCurrPassword] = useState({ value: "", error: "" });
  const [newPassword, setNewPassword] = useState({ value: "", error: "" });

  const [changePassword] = useMutation(CHANGE_PASSWORD);

  const fetchUser = async () => {
    const user = await getUser();
    setUser(user);
  };

  const _onChangePressed = () => {
    const currPasswordError = passwordValidator(currPassword.value);
    const newPasswordError = passwordValidator(newPassword.value);

    if (currPasswordError || newPasswordError) {
      setCurrPassword({ ...currPassword, error: currPasswordError });
      setNewPassword({ ...newPassword, error: newPasswordError });
      return;
    }
    showLoading();
    changePassword({
      variables: {
        email: user.email,
        password: currPassword.value,
        newPassword: newPassword.value,
      },
    })
      .then(({ data }) => {
        hideLoading();
        if (data.changePassword) {
          showSuccesToast("Password changed.");
          setShowChangePassword(false);
          setCurrPassword({ ...currPassword, value: "" });
          setNewPassword({ ...newPassword, value: "" });
        }
      })
      .catch((e) => {
        console.log(e);
        hideLoading();
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Background alignTop={true}>
      <ViewWithTitle title="Details">
        <View style={styles.item}>
          <Title style={styles.title}>
            <Text>First Name</Text>
          </Title>
          <Caption style={styles.caption}>{user.firstName}</Caption>
        </View>
        <View style={styles.item}>
          <Title style={styles.title}>
            <Text>Last Name</Text>
          </Title>
          <Caption style={styles.caption}>{user.lastName}</Caption>
        </View>
        <View style={styles.item}>
          <Title style={styles.title}>
            <Text>Email</Text>
          </Title>
          <Caption style={styles.caption}>{user.email}</Caption>
        </View>
        {!showChangePassword && (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => setShowChangePassword(true)}>
              <Text style={styles.link}>Change Password</Text>
            </TouchableOpacity>
          </View>
        )}
      </ViewWithTitle>
      {showChangePassword && (
        <ViewWithTitle
          title="Change Password"
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.item}>
            <TextInput
              label="Current Password"
              returnKeyType="done"
              value={currPassword.value}
              onChangeText={(text) =>
                setCurrPassword({ value: text, error: "" })
              }
              error={!!currPassword.error}
              errorText={currPassword.error}
              secureTextEntry
            />
          </View>
          <View style={styles.item}>
            <TextInput
              label="New Password"
              returnKeyType="done"
              value={newPassword.value}
              onChangeText={(text) =>
                setNewPassword({ value: text, error: "" })
              }
              error={!!newPassword.error}
              errorText={newPassword.error}
              secureTextEntry
            />
          </View>
          <Button mode="contained" onPress={_onChangePressed}>
            Change Password
          </Button>
        </ViewWithTitle>
      )}
    </Background>
  );
};

export default memo(Profile);
