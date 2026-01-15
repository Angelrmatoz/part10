import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Linking as RNLinking, ActivityIndicator } from 'react-native';
import { useParams } from 'react-router-native';
import { gql, useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

let Linking;
try {
  // try to require expo-linking at runtime (works if installed)
  Linking = require('expo-linking');
} catch (e) {
  Linking = RNLinking;
}

const GET_REPOSITORY = gql`
  query Repository($id: ID!, $first: Int, $after: String) {
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
      reviews(first: $first, after: $after) {
        totalCount
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
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
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
  const FIRST = 5; // number of reviews to load per page (adjust while testing)
  const [fetchingMore, setFetchingMore] = useState(false);

  const initialVariables = { id, first: FIRST };
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, { variables: initialVariables, fetchPolicy: 'cache-and-network' });

  if (loading && !data) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  // Guard: si no hay repository, evitar pasar undefined a RepositoryItem
  if (!data || !data.repository) return <Text>Repository not found</Text>;

  const repository = data.repository;
  const reviewsConnection = repository.reviews || { edges: [], pageInfo: {} };
  const reviews = reviewsConnection.edges.map(e => e.node) ?? [];
  const pageInfo = reviewsConnection.pageInfo || { hasNextPage: false };

  const handleFetchMore = async () => {
    if (fetchingMore) return;
    if (!pageInfo.hasNextPage) return;
    if (reviews.length < FIRST) return; // don't fetch more if we don't have a full first page

    setFetchingMore(true);
    try {
      await fetchMore({
        variables: { id, first: FIRST, after: pageInfo.endCursor },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          const nextReviews = fetchMoreResult.repository.reviews;
          return {
            repository: {
              ...prev.repository,
              reviews: {
                ...nextReviews,
                edges: [...prev.repository.reviews.edges, ...nextReviews.edges],
              },
            },
          };
        },
      });
    } catch (e) {
      // ignore fetchMore error for now or you can set an error state
    }
    setFetchingMore(false);
  };

  const renderFooter = () => (
    fetchingMore ? (
      <View style={{ padding: 12 }}>
        <ActivityIndicator />
      </View>
    ) : null
  );

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      contentContainerStyle={{ paddingBottom: 40 }}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
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
