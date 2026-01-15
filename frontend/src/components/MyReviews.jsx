import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import Text from './Text';

const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
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

const MyReviewItem = ({ review, onViewRepository }) => (
  <View style={styles.reviewContainer} testID={`myReviewItem-${review.id}`}>
    <View style={styles.ratingCircle}>
      <Text color="primary" fontWeight="bold">{review.rating}</Text>
    </View>
    <View style={styles.reviewText}>
      <Text fontWeight="bold">{review.repository?.fullName}</Text>
      <Text color="textSecondary">{formatDate(review.createdAt)}</Text>
      <Text>{review.text}</Text>
      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={() => onViewRepository(review.repository?.id)} style={styles.actionButton}>
          <Text color="white">View repository</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const MyReviews = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, { variables: { includeReviews: true }, fetchPolicy: 'cache-and-network' });
  const navigate = useNavigate();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const me = data?.me;
  if (!me) return <Text>No user data</Text>;

  const reviews = me.reviews?.edges?.map(e => e.node) || [];

  const handleViewRepository = (repoId) => {
    if (repoId) navigate(`/repositories/${repoId}`);
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <MyReviewItem review={item} onViewRepository={handleViewRepository} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={{ paddingBottom: 40 }}
    />
  );
};

const styles = StyleSheet.create({
  separator: { height: 10 },
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
  actionsRow: {
    marginTop: 8,
  },
  actionButton: {
    backgroundColor: '#0366d6',
    padding: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
});

export default MyReviews;

