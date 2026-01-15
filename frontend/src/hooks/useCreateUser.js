import { useMutation, gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      username
    }
  }
`;

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const createUser = async ({ username, password }) => {
    const response = await mutate({ variables: { user: { username, password } } });
    return response;
  };

  return [createUser, result];
};

export default useCreateUser;

