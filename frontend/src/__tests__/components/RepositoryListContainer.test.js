import React from 'react';
import { render } from '@testing-library/react-native';
import RepositoryList from '../../components/RepositoryList';
import useRepositories from '../../hooks/useRepositories';

jest.mock('../../hooks/useRepositories');

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
            const repositories = {
                totalCount: 8,
                pageInfo: {
                    hasNextPage: true,
                    endCursor:
                        'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                },
                edges: [
                    {
                        node: {
                            id: 'jaredpalmer.formik',
                            fullName: 'jaredpalmer/formik',
                            description: 'Build forms in React, without the tears',
                            language: 'TypeScript',
                            forksCount: 1619,
                            stargazersCount: 21856,
                            ratingAverage: 88,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars2.githubusercontent.com/u/4060187?v=4',
                        },
                        cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                    },
                    {
                        node: {
                            id: 'async-library.react-async',
                            fullName: 'async-library/react-async',
                            description: 'Flexible promise-based React data loader',
                            language: 'JavaScript',
                            forksCount: 69,
                            stargazersCount: 1760,
                            ratingAverage: 72,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars1.githubusercontent.com/u/54310907?v=4',
                        },
                        cursor:
                            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    },
                ],
            };

            // Mock the hook to return the repository nodes
            useRepositories.mockReturnValue({
                repositories: repositories.edges.map(edge => edge.node),
                loading: false,
                error: null,
            });

            const { getByText, getAllByText } = render(<RepositoryList />);

            // Check full names
            expect(getByText('jaredpalmer/formik')).toBeTruthy();
            expect(getByText('async-library/react-async')).toBeTruthy();

            // Check descriptions
            expect(getByText('Build forms in React, without the tears')).toBeTruthy();
            expect(getByText('Flexible promise-based React data loader')).toBeTruthy();

            // Check languages
            expect(getByText('TypeScript')).toBeTruthy();
            expect(getByText('JavaScript')).toBeTruthy();

            // The counts are formatted (e.g. 21856 -> 21.9k)
            expect(getByText('21.9k')).toBeTruthy(); // stars for first repo
            expect(getByText('1.6k')).toBeTruthy(); // forks for first repo
            // '3' appears for both repositories (reviewCount), so check there are at least 2 occurrences
            expect(getAllByText('3').length).toBeGreaterThanOrEqual(2);
            expect(getByText('88')).toBeTruthy(); // rating for first repo

            expect(getByText('1.8k')).toBeTruthy(); // stars for second repo (1760 -> 1.8k)
            expect(getByText('69')).toBeTruthy(); // forks for second repo
            expect(getByText('72')).toBeTruthy(); // rating for second repo

            // Optionally check that there are two repository items by counting full names
            expect(getAllByText(/\//).length).toBeGreaterThanOrEqual(2);
        });
    });
});