import ApolloClient, { InMemoryCache } from "apollo-boost";
import { showErrorToast } from "components/UIUtilities";

//https://www.richardkotze.com/coding/json-web-tokens-using-apollo-graphql

const makeApolloClient = () => {
  const client = new ApolloClient({
    uri: `http://192.168.43.7:4000/graphql`,
    cache: new InMemoryCache(),
    credentials: "include",
    request: async (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: "include",
        },
      });
    },
    onError: ({ graphQLErrors, networkError, operation, forward }) => {
      console.log(graphQLErrors, networkError);
      if (networkError) {
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
            case "UNAUTHENTICATED":
              // old token has expired throwing AuthenticationError,
              // one way to handle is to obtain a new token and
              // add it to the operation context
              const headers = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...headers,
                  //authorization: getNewToken(),
                },
              });
              // Now, pass the modified operation to the next link
              // in the chain. This effectively intercepts the old
              // failed request, and retries it with a new token
              return forward(operation);
              break;

            // handle other errors
            case "ANOTHER_ERROR_CODE":
              break;
            // ...
          }
        }
      }
    },
  });
  return client;
};
export default makeApolloClient;
