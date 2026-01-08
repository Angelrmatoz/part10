import { useMutation, gql, useApolloClient } from '@apollo/client';
import AuthStorage from '../utils/authStorage';

const authStorage = new AuthStorage();

const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
      expiresAt
      user {
        id
        username
      }
    }
  }
`;

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const response = await mutate({ variables: { credentials: { username, password } } });

    const token = response?.data?.authenticate?.accessToken;

    if (token) {
      try {
        await authStorage.setAccessToken(token);
        await apolloClient.resetStore();
      } catch (e) {
        
      }
    }

    return response;
  };

  return [signIn, result];
};

export default useSignIn;
