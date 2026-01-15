import { useQuery, gql } from '@apollo/client';

const GET_REPOSITORIES = gql`
    query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
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

const useRepositories = (variables = {}) => {
    const { orderBy = 'CREATED_AT', orderDirection = 'DESC' } = variables;

    const { data, loading, error } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: { orderBy, orderDirection },
    });

    return {
        repositories: data?.repositories?.edges.map(edge => edge.node) || [],
        loading,
        error,
    };
};

export default useRepositories;
