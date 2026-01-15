import React from 'react';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import SignUpContainer from './SignUpContainer';
import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(1).max(30),
  password: yup.string().required('Password is required').min(5).max(50),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values, { setErrors, setFieldError }) => {
    const { username, password } = values;
    try {
      // normalize username to avoid case issues
      const normalizedUsername = username.trim();
      await createUser({ username: normalizedUsername, password });

      // after successful creation, sign in
      await signIn({ username: normalizedUsername, password });

      navigate('/');
    } catch (e) {
      // Apollo error handling: show username taken if applicable
      const graphQLErrors = e?.graphQLErrors;
      if (graphQLErrors && graphQLErrors.length > 0) {
        const code = graphQLErrors[0]?.extensions?.code;
        if (code === 'USERNAME_TAKEN') {
          setFieldError('username', 'Username already taken');
          return;
        }
      }

      // fallback generic error
      setErrors({ general: 'Something went wrong' });
    }
  };

  return <SignUpContainer onSubmit={onSubmit} validationSchema={validationSchema} />;
};

export default SignUp;

