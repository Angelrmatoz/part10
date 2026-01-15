import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, Text as RNText, Modal, Pressable, TextInput } from 'react-native';
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
    header: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    selectorRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 6,
    },
    selectorText: {
        fontSize: 18,
        color: '#222',
    },
    chevron: {
        fontSize: 18,
        color: '#666',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 70,
    },
    modalBox: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 4,
        elevation: 5,
        overflow: 'hidden',
    },
    modalTitle: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        color: '#999',
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
    },
    optionTouchable: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    optionText: {
        fontSize: 16,
        color: '#222',
    },
    optionTextActive: {
        color: '#0366d6',
        fontWeight: 'bold',
    },
    searchInput: {
        height: 44,
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingHorizontal: 12,
        fontSize: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const options = [
    { key: 'latest', label: 'Latest repositories' },
    { key: 'highest', label: 'Highest rated repositories' },
    { key: 'lowest', label: 'Lowest rated repositories' },
];

class RepositoryListContainer extends React.Component {
    renderHeader = () => {
        const { selected, onSelect, searchText, onSearchChange } = this.props;
        const selectedLabel = options.find(o => o.key === selected)?.label || options[0].label;

        return (
            <View style={styles.header}>
                <TextInput
                    placeholder="Search"
                    value={searchText}
                    onChangeText={onSearchChange}
                    style={styles.searchInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                />

                <Selector selected={selected} selectedLabel={selectedLabel} onSelect={onSelect} />
            </View>
        );
    };

    render() {
        const { data, renderItem, keyExtractor, loading } = this.props;

        if (loading) return null;

        return (
            <FlatList
                style={styles.list}
                data={data}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                contentContainerStyle={{ paddingVertical: 10 }}
                ListHeaderComponent={this.renderHeader}
            />
        );
    }
}

const Selector = ({ selected, selectedLabel, onSelect }) => {
    const [visible, setVisible] = useState(false);
    return (
        <View>
            <TouchableOpacity onPress={() => setVisible(true)} style={styles.selectorRow}>
                <RNText style={styles.selectorText}>{selectedLabel}</RNText>
                <RNText style={styles.chevron}>▾</RNText>
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
                    <Pressable style={styles.modalBox} onPress={() => {}}>
                        <RNText style={styles.modalTitle}>Select an item...</RNText>
                        <View style={styles.divider} />
                        {options.map((opt, idx) => (
                            <React.Fragment key={opt.key}>
                                <TouchableOpacity
                                    onPress={() => {
                                        onSelect(opt.key);
                                        setVisible(false);
                                    }}
                                    style={styles.optionTouchable}
                                >
                                    <RNText style={[styles.optionText, selected === opt.key && styles.optionTextActive]}>{opt.label}</RNText>
                                </TouchableOpacity>
                                {idx < options.length - 1 && <View style={styles.divider} />}
                            </React.Fragment>
                        ))}
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};

const RepositoryListWrapper = () => {
    const [selectedOrder, setSelectedOrder] = useState('latest');
    const [searchText, setSearchText] = useState('');
    const [debounced, setDebounced] = useState(searchText);

    // simple debounce: update debounced after 500ms of inactivity
    useEffect(() => {
        const t = setTimeout(() => setDebounced(searchText), 500);
        return () => clearTimeout(t);
    }, [searchText]);

    // map order to GraphQL variables
    let orderBy = 'CREATED_AT';
    let orderDirection = 'DESC';

    if (selectedOrder === 'highest') {
        orderBy = 'RATING_AVERAGE';
        orderDirection = 'DESC';
    } else if (selectedOrder === 'lowest') {
        orderBy = 'RATING_AVERAGE';
        orderDirection = 'ASC';
    }

    const { repositories, loading } = useRepositories({ orderBy, orderDirection, searchKeyword: debounced });
    const navigate = useNavigate();

    const data = Array.isArray(repositories)
        ? repositories
        : repositories?.edges?.map(edge => edge.node) || [];

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigate(`/repositories/${item.id}`)}>
            <RepositoryItem item={item} />
        </TouchableOpacity>
    );

    return (
        <RepositoryListContainer
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            loading={loading}
            selected={selectedOrder}
            onSelect={setSelectedOrder}
            searchText={searchText}
            onSearchChange={setSearchText}
        />
    );
};

export default RepositoryListWrapper;

