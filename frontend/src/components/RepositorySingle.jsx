import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Linking as RNLinking } from 'react-native';
import { useParams } from 'react-router-native';
import { gql, useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

let Linking;
try {
  // try to require expo-linking at runtime (works if installed)
  // eslint-disable-next-line global-require
  Linking = require('expo-linking');
} catch (e) {
  Linking = RNLinking;
}

const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews(first: 10) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};

const ReviewItem = ({ review }) => {
  const formattedDate = review.createdAt ? formatDate(review.createdAt) : '';
  return (
    <View style={styles.reviewContainer} testID={`reviewItem-${review.id}`}>
      <View style={styles.ratingCircle}>
        <Text color="primary" fontWeight="bold">{review.rating}</Text>
      </View>
      <View style={styles.reviewText}>
        <Text fontWeight="bold">{review.user?.username}</Text>
        <Text color="textSecondary">{formattedDate}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const RepositoryInfo = ({ repository }) => (
  <View>
    <RepositoryItem item={repository} />
    <View style={styles.openButtonContainer}>
      <TouchableOpacity
        onPress={() => repository.url && Linking.openURL(repository.url)}
        style={styles.openButton}
        testID="openInGithub"
      >
        <Text color="white" fontWeight="bold">Open in GitHub</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, { variables: { id } });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  // Guard: si no hay repository, evitar pasar undefined a RepositoryItem
  if (!data || !data.repository) return <Text>Repository not found</Text>;

  const repository = data.repository;
  const reviews = repository?.reviews?.edges?.map(e => e.node) ?? [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      contentContainerStyle={{ paddingBottom: 40 }}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'white',
  },
  ratingCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  reviewText: {
    flex: 1,
  },
  openButtonContainer: {
    padding: 12,
    backgroundColor: 'white',
  },
  openButton: {
    backgroundColor: '#0366d6',
    padding: 12,
    alignItems: 'center',
    borderRadius: 4,
  },
});

export default SingleRepository;
