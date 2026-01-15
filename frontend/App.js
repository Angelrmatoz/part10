import React from 'react';
import Main from './src/Main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';
import AuthStorage from './src/utils/authStorage';

const httpLink = createHttpLink({
  uri: Constants.expoConfig.extra.APOLLO_URI,
});

const authStorage = new AuthStorage();

const authLink = setContext(async (_, { headers }) => {
  const token = await authStorage.getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NativeRouter>
        <Main />
      </NativeRouter>
    </ApolloProvider>
  );
}
