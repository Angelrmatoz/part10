import React from 'react';
import {View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 10,
        paddingLeft: 10,
    },
    background: {
        backgroundColor: '#24292e',
    },
    title: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

const AppBar = () => {
    return <View style={[styles.container, styles.background]}><AppBarTab title="Repositories"/></View>;
};

export default AppBar;