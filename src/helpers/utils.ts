import { AsyncStorage, findNodeHandle } from "react-native";
import { ApolloError } from "apollo-client";

const AUTH_TOKEN = "AUTH_TOKEN";
const USER_DETAILS = "USER_DETAILS";

let token;

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }
  token = await AsyncStorage.getItem(AUTH_TOKEN);
  return token;
};

export const signIn = (newToken) => {
  token = newToken;
  return AsyncStorage.setItem(AUTH_TOKEN, newToken);
};

export const signOut = () => {
  token = undefined;
  return AsyncStorage.removeItem(AUTH_TOKEN);
};

export const getUser = async () => {
  const user = await AsyncStorage.getItem(USER_DETAILS);
  return JSON.parse(user) || {};
};

export const setUser = (user) => {
  return AsyncStorage.setItem(USER_DETAILS, JSON.stringify(user));
};

export const removeUser = () => {
  return AsyncStorage.removeItem(USER_DETAILS);
};

export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";

  return "";
};

export const passwordValidator = (password) => {
  if (!password || password.length <= 0) return "Password cannot be empty.";
  if (password && password.length <= 2) return "Password cannot be too small.";
  return "";
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) return "Name cannot be empty.";

  return "";
};

export const extractGQLErrorMessage = (error: ApolloError) => {
  const { 1: errorMessage } = error.message.split("GraphQL error: ");
  return errorMessage;
};

export const extractNetworkErrorMessage = (error: ApolloError) => {
  const { 1: errorMessage } = error.message.split("Network error: ");
  return errorMessage;
};

export const scrollToComponentInScrollView11 = (
  scrollViewRef,
  componentRef
) => {
  if (scrollViewRef) {
    setTimeout(() => {
      try {
        const scrollResponder = scrollViewRef.getScrollResponder();

        scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
          findNodeHandle(componentRef),
          100,
          true
        );
      } catch (err) {
        console.log("error", err);
      }
    }, 50);
  }
};

export const scrollToComponentInScrollView = (scrollViewRef, componentRef) => {
  if (scrollViewRef && componentRef) {
    componentRef.current.measureLayout(
      findNodeHandle(scrollViewRef.current),
      (x, y) => {
        scrollViewRef.current.scrollTo({ x: 0, y: y, animated: true });
      }
    );
  }
};

export default {
  getToken,
  signIn,
  signOut,
  getUser,
  setUser,
  removeUser,
  emailValidator,
  passwordValidator,
  nameValidator,
  extractGQLErrorMessage,
  extractNetworkErrorMessage,
  scrollToComponentInScrollView,
};
