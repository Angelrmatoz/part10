import React from 'react';
import { Button, View } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';

const SignUpContainer = ({ onSubmit, validationSchema }) => (
  <Formik
    initialValues={{ username: '', password: '', passwordConfirm: '' }}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => (
      <View>
        <Text>Create an account</Text>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry />
        <FormikTextInput name="passwordConfirm" placeholder="Password confirmation" secureTextEntry />
        <Button title="Sign up" onPress={handleSubmit} />
      </View>
    )}
  </Formik>
);

export default SignUpContainer;
