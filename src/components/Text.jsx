import React from 'react';
import { Text as NativeText } from 'react-native';

const Text = (props) => {
  return <NativeText {...props}>{props.children}</NativeText>;
};

export default Text;
