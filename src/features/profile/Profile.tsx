import React, { memo, useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Title, Caption } from "react-native-paper";

import {
  Background,
  ViewWithTitle,
  CenterSpinner,
  TextInput,
  Button,
} from "components";
import { getUser } from "helpers/utils";

import styles from "./styles";

const Profile = ({ ...props }) => {
  const [user, setUser] = useState(null);
  const [changePassword, setChangePassword] = useState(false);

  const fetchUser = async () => {
    const user = await getUser();
    setUser(user);
  };

  const _onChangePressed = () => {};

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return <CenterSpinner overlay="true" />;
  }
  console.log(user);
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
        {!changePassword && (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => setChangePassword(true)}>
              <Text style={styles.link}>Change Password</Text>
            </TouchableOpacity>
          </View>
        )}
      </ViewWithTitle>
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
            //value={password.value}
            //onChangeText={(text) => setPassword({ value: text, error: "" })}
            // error={!!password.error}
            // errorText={password.error}
            secureTextEntry
          />
        </View>
        <View style={styles.item}>
          <TextInput
            label="New Password"
            returnKeyType="done"
            //value={password.value}
            //onChangeText={(text) => setPassword({ value: text, error: "" })}
            // error={!!password.error}
            // errorText={password.error}
            secureTextEntry
          />
        </View>
        <Button mode="contained" onPress={_onChangePressed}>
          Change Password
        </Button>
      </ViewWithTitle>
    </Background>
  );
};

export default memo(Profile);
