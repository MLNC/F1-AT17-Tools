/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getComp = /* GraphQL */ `
  query GetComp($id: ID!) {
    getComp(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listComps = /* GraphQL */ `
  query ListComps(
    $filter: ModelCompFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
