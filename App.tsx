import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "react-apollo";
import { SafeAreaProvider } from "react-native-safe-area-context";

import App from "./src";
import { theme } from "helpers/theme";
import makeApolloClient from "helpers/apollo";
import { Spinner, LoadingProvider } from "components";
import { HeaderTitleContext } from "contexts";
import { useHeaderTitle } from "hooks";
console.disableYellowBox = true;

//console.ignoredYellowBox = ["Require cycle: node_modules/react-native-paper"];
console.ignoredYellowBox = ["Require cycle"];

const Main = () => {
  const headerTitle = useHeaderTitle();
  const client = makeApolloClient();
  if (!client) {
    return null;
  }
  return (
    <Provider theme={theme}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <SafeAreaProvider>
            <HeaderTitleContext.Provider value={headerTitle}>
              <LoadingProvider>
                <App />
                <Spinner />
              </LoadingProvider>
            </HeaderTitleContext.Provider>
          </SafeAreaProvider>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
};

export default Main;
