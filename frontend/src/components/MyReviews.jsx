import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
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

const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
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

const MyReviewItem = ({ review, onViewRepository, onDelete }) => (
  <View style={styles.reviewContainer} testID={`myReviewItem-${review.id}`}>
    <View style={styles.ratingCircle}>
      <Text color="primary" fontWeight="bold">{review.rating}</Text>
    </View>
    <View style={styles.reviewText}>
      <Text fontWeight="bold">{review.repository?.fullName}</Text>
      <Text color="textSecondary">{formatDate(review.createdAt)}</Text>
      <Text>{review.text}</Text>
      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={() => onViewRepository(review.repository?.id)} style={styles.viewButton}>
          <Text color="white">View repository</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(review.id)} style={styles.deleteButton}>
          <Text color="white">Delete review</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, { variables: { includeReviews: true }, fetchPolicy: 'cache-and-network' });
  const [doDelete] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const me = data?.me;
  if (!me) return <Text>No user data</Text>;

  const reviews = me.reviews?.edges?.map(e => e.node) || [];

  const handleViewRepository = (repoId) => {
    if (repoId) navigate(`/repositories/${repoId}`);
  };

  const handleDelete = (reviewId) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'CANCEL', style: 'cancel' },
        { text: 'DELETE', style: 'destructive', onPress: async () => {
          try {
            await doDelete({ variables: { id: reviewId } });
            // refetch the user's reviews
            await refetch();
          } catch (e) {
            // show minimal feedback
            Alert.alert('Error', 'Could not delete the review');
          }
        } },
      ],
      { cancelable: true }
    );
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <MyReviewItem review={item} onViewRepository={handleViewRepository} onDelete={handleDelete} />}
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
    marginTop: 12,
    flexDirection: 'row',
    gap: 12,
  },
  viewButton: {
    backgroundColor: '#0366d6',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 4,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 4,
    alignItems: 'center',
    marginLeft: 12,
  },
});

export default MyReviews;

