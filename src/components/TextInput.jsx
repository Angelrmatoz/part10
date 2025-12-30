import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: {
        borderColor: '#e1e4e8',
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
    },
    error: {
        borderColor: '#d73a4a',
    },
});

const TextInput = ({ style, error, ...props }) => {
    const textInputStyle = [styles.input, error ? styles.error : null, style];

    return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;