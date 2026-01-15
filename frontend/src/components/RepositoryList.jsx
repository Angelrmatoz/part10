import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    list: {
        flex: 1,
        backgroundColor: '#e1e4e8',
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const { repositories, loading } = useRepositories();
    const navigate = useNavigate();

    // repositories might be an array (from hook) or a paginated object with edges (from tests)
    const data = Array.isArray(repositories)
        ? repositories
        : repositories?.edges?.map(edge => edge.node) || [];

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigate(`/repositories/${item.id}`)}>
            <RepositoryItem item={item} />
        </TouchableOpacity>
    );

    if (loading) return null;

    return (
        <FlatList
            style={styles.list}
            data={data}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingVertical: 10 }}
        />
    );
};

export default RepositoryList;