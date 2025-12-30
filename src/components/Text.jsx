import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.main,
    color: theme.colors.textPrimary,
    fontSize: 16,
  },
});

const Text = (props) => {
  return <NativeText {...props} style={[styles.text, props.style]}>{props.children}</NativeText>;
};

export default Text;
