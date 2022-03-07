import {
  ApolloClient,
  makeVar,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const TOKEN = 'token';
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
export const logOutUserIn = () => {
  localStorage.removeItem(TOKEN);
  window.location.reload();
};
export const darkModeVar = makeVar(false);

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});
const authLink = setContext((_, { headers }) => {
  return {
    headers: { ...headers, token: localStorage.getItem(TOKEN) },
  };
});

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
