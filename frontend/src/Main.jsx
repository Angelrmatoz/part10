import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Route, Routes, Navigate} from 'react-router-native';
import RepositoryList from './components/RepositoryList';
import RepositorySingle from './components/RepositorySingle';
import SignIn from './components/SignIn';
import AppBar from './components/AppBar';
import CreateReview from './components/CreateReview';
import SignUp from './components/SignUp';
import MyReviews from './components/MyReviews';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: '#e1e4e8',
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar/>
            <Routes>
                <Route path="/" element={<RepositoryList/>}/>
                <Route path="/repositories/:id" element={<RepositorySingle/>} />
                <Route path="/create-review" element={<CreateReview/>} />
                <Route path="/sign-in" element={<SignIn/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/my-reviews" element={<MyReviews/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </View>
    );
};

export default Main;