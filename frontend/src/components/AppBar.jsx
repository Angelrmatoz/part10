import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import {Link, useLocation} from 'react-router-native';
import {useQuery, gql, useApolloClient} from '@apollo/client';
import AuthStorage from '../utils/authStorage';
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

const AUTHORIZED_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

const authStorage = new AuthStorage();

const AppBar = () => {
    const location = useLocation();
    const { data } = useQuery(AUTHORIZED_USER);
    const apolloClient = useApolloClient();

    const onSignOut = async () => {
        await authStorage.removeAccessToken();
        await apolloClient.resetStore();
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to="/" component={TouchableWithoutFeedback}
                      style={[styles.tab, location.pathname === '/' && styles.activeTab]}>
                    <Text style={styles.tabText}>Repositories</Text>
                </Link>
                {data && data.me ? (
                    <>
                        <Link to="/create-review" component={TouchableWithoutFeedback}
                              style={[styles.tab, location.pathname === '/create-review' && styles.activeTab]}>
                            <Text style={styles.tabText}>Create a review</Text>
                        </Link>
                        <Link to="/my-reviews" component={TouchableWithoutFeedback}
                              style={[styles.tab, location.pathname === '/my-reviews' && styles.activeTab]}>
                            <Text style={styles.tabText}>My reviews</Text>
                        </Link>
                        <TouchableWithoutFeedback onPress={onSignOut}>
                            <View style={[styles.tab, location.pathname === '/sign-in' && styles.activeTab]}>
                                <Text style={styles.tabText}>Sign Out</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </>
                ) : (
                    <>
                      <Link to="/sign-in" component={TouchableWithoutFeedback}
                            style={[styles.tab, location.pathname === '/sign-in' && styles.activeTab]}>
                          <Text style={styles.tabText}>Sign In</Text>
                      </Link>
                      <Link to="/sign-up" component={TouchableWithoutFeedback}
                            style={[styles.tab, location.pathname === '/sign-up' && styles.activeTab]}>
                          <Text style={styles.tabText}>Sign up</Text>
                      </Link>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default AppBar;