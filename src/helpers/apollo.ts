import ApolloClient, { InMemoryCache } from "apollo-boost";

//ts-ignore
import { GRAPHQL_ENDPOINT } from "react-native-dotenv";
import { showErrorToast } from "components/UIUtilities";
import { EventRegister } from "react-native-event-listeners";
import EventNames from "constants/event-names";

const makeApolloClient = () => {
  console.log(GRAPHQL_ENDPOINT);
  const client = new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
    credentials: "include",
    request: async operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        }
      });
    },
    onError: ({ graphQLErrors, networkError, operation, forward }) => {
      console.log(graphQLErrors, networkError);
      if (networkError && !graphQLErrors) {
        console.log(`[Network error]: ${networkError}`);
        showErrorToast("Network error.");
      }
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          // handle errors differently based on its error code
          console.log(err.extensions.code);
          switch (err.extensions.code) {
            case "BAD_USER_INPUT":
              showErrorToast(err.extensions.inputError.message);
              break;
            case "FORBIDDEN":
              EventRegister.emit(EventNames.UNAUTHORISED_ACCESS, {});
              break;
            case "UNAUTHENTICATED":
              EventRegister.emit(EventNames.UNAUTHORISED_ACCESS, {});
              // old token has expired throwing AuthenticationError,
              // one way to handle is to obtain a new token and
              // add it to the operation context

              //const headers = operation.getContext().headers;
              //operation.setContext({
              //  headers: {
              //    ...headers,
              ////authorization: getNewToken(),
              //  },
              //});
              // Now, pass the modified operation to the next link
              // in the chain. This effectively intercepts the old
              // failed request, and retries it with a new token
              // return forward(operation);
              break;
          }
        }
      }
    }
  });
  return client;
};
export default makeApolloClient;
