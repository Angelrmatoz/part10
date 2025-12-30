import React from 'react';
import { Button } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Username is required';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    }
    return errors;
};

const SignIn = () => {
    const onSubmit = values => {
        console.log('Sign in submit:', values);
    };

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={onSubmit}
            validate={validate}
        >
            {({ handleSubmit }) => (
                <>
                    <Text>The sign in view</Text>
                    <FormikTextInput name="username" placeholder="Username" />
                    <FormikTextInput name="password" placeholder="Password" secureTextEntry />
                    <Button title="Submit" onPress={handleSubmit} />
                </>
            )}
        </Formik>
    );
};

export default SignIn;