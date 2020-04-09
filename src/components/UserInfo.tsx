import React, { memo, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import Moment from "moment";

import { theme } from "helpers";
import CenterSpinner from "components/CenterSpinner";
import { getUser } from "helpers/utils";

const UserInfo = ({ ...props }) => {
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    const user = await getUser();
    setUser(user);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return <CenterSpinner />;
  }
  return (
    <View style={styles.userInfoSection}>
      <Avatar.Image source={{}} size={80} />
      <Title style={styles.title}>
        {user.firstName} {user.lastName}
      </Title>
      <Caption style={styles.caption}>{user.email}</Caption>
      <Caption style={styles.caption}>
        Last login:
        {Moment(user.lastLoggedIn).format(" YYYY-MM-DD HH:mma")}
      </Caption>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoSection: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 10,
    fontWeight: "bold",
    color: theme.colors.secondary,
  },
  drawerItem: {
    color: theme.colors.secondary,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
});

export default memo(UserInfo);
