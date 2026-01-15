import { useQuery, gql } from '@apollo/client';

const GET_REPOSITORIES = gql`
    query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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
    const { orderBy = 'CREATED_AT', orderDirection = 'DESC', searchKeyword } = variables;

    const { data, loading, error } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: { orderBy, orderDirection, searchKeyword },
    });

    return {
        repositories: data?.repositories?.edges.map(edge => edge.node) || [],
        loading,
        error,
    };
};

export default useRepositories;
