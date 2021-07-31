/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getComp = /* GraphQL */ `
  query GetComp($id: ID!) {
    getComp(id: $id) {
      id
      compId
      compName
      isConfirmed
      note
      ships {
        shipId
        shipName
        points
        hullType
        fitting
      }
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
        compId
        compName
        isConfirmed
        note
        ships {
          shipId
          shipName
          points
          hullType
          fitting
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
