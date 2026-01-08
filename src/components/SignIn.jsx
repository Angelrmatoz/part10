import React from 'react';
import { Button } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

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
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async values => {
        const { username, password } = values;

        try {
            const { data } = await signIn({ username, password });
            if (data) {
                navigate('/');
            }
        } catch (e) {
            console.log(e);
        }
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