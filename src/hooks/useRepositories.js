import { useQuery, gql } from '@apollo/client';

const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
                node {
                    id
                    fullName
                    description
                    language
                    forksCount
                    stargazersCount
                    ratingAverage
                    reviewCount
                    ownerAvatarUrl
                }
            }
        }
    }
`;

const useRepositories = () => {
    const { data, loading, error } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    });

    return {
        repositories: data?.repositories?.edges.map(edge => edge.node) || [],
        loading,
        error,
    };
};

export default useRepositories;
