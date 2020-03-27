import React, { memo } from "react";
import { DrawerItem } from "@react-navigation/drawer";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import ScreenNames from "constants/screen-names";

const LOGOUT_USER = gql`
  mutation logout($accessToken: String!) {
    logout(accessToken: $accessToken)
  }
`;
const LogoutDrawerItem = ({ ...props }) => {
  const [logout] = useMutation(LOGOUT_USER);

  const handleLogout = () => {
    logout({ variables: { accessToken: "test" } })
      .then(({ data }) => {
        props.navigation.navigate(ScreenNames.HOME);
      })
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <DrawerItem
      icon={props.icon}
      label={props.label}
      onPress={() => {
        handleLogout();
      }}
    />
  );
};
export default memo(LogoutDrawerItem);
