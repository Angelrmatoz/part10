import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 6,
    marginHorizontal: 10,
    marginVertical: 4,
    elevation: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 16,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: '#586069',
    marginBottom: 6,
  },
  languageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  language: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statCount: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  statLabel: {
    color: '#586069',
    fontSize: 13,
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace('.0', '') + 'k';
  }
  return String(count);
};

const RepositoryItem = ({ item }) => (
  <View testID="repositoryItem" style={styles.container}>
    <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
    <View style={styles.info}>
      <Text style={styles.fullName}>{item.fullName}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.languageContainer}>
        <Text style={styles.language}>{item.language}</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statCount}>{formatCount(item.stargazersCount)}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statCount}>{formatCount(item.forksCount)}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statCount}>{formatCount(item.reviewCount)}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statCount}>{formatCount(item.ratingAverage)}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
  </View>
);

export default RepositoryItem;
