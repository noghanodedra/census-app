import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "react-apollo";
import { SafeAreaProvider } from "react-native-safe-area-context";

import App from "./src";
import { theme } from "helpers/theme";
import makeApolloClient from "helpers/apollo";
import CenterSpinner from "components/CenterSpinner";
import { getToken } from "helpers/utils";
import { HeaderTitleContext } from "contexts";
import { useHeaderTitle } from "hooks";
console.disableYellowBox = true;

const Main = () => {
  const headerTitle = useHeaderTitle();
  const [client, setClient] = React.useState(null);
  const fetchSession = async () => {
    // fetch session
    const session = await getToken();
    const sessionObj = JSON.parse(session) || {};
    const { token, id } = sessionObj;

    const client = makeApolloClient();

    setClient(client);
  };
  React.useEffect(() => {
    fetchSession();
  }, []);

  if (!client) {
    return <CenterSpinner />;
  }
  return (
    <Provider theme={theme}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <SafeAreaProvider>
            <HeaderTitleContext.Provider value={headerTitle}>
              <App />
            </HeaderTitleContext.Provider>
          </SafeAreaProvider>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
};

export default Main;
