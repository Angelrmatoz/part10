import React from 'react';
import Main from './src/Main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';

const client = new ApolloClient({
  uri: Constants.expoConfig.extra.APOLLO_URI,
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
