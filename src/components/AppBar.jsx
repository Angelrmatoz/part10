import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Constants from 'expo-constants';
import {Link, useLocation} from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 8,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#24292e',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    marginRight: 20,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  activeTab: {
    backgroundColor: '#444c56',
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const AppBar = () => {
  const location = useLocation();
  return (
    <View style={styles.container}>
      <Link to="/" component={TouchableWithoutFeedback} style={[styles.tab, location.pathname === '/' && styles.activeTab]}>
        <Text style={styles.tabText}>Repositories</Text>
      </Link>
      <Link to="/sign-in" component={TouchableWithoutFeedback} style={[styles.tab, location.pathname === '/sign-in' && styles.activeTab]}>
        <Text style={styles.tabText}>Sign In</Text>
      </Link>
    </View>
  );
};

export default AppBar;