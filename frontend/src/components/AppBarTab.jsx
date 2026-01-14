import React from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const styles = StyleSheet.create({
    tab: {
        padding: 15,
    },
    tabText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

const AppBarTab = ({ title }) => {
    return (
        <TouchableWithoutFeedback>
            <Text style={styles.tabText}>{title}</Text>
        </TouchableWithoutFeedback>
    );
};

export default AppBarTab;