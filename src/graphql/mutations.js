/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createComp = /* GraphQL */ `
  mutation CreateComp(
    $input: CreateCompInput!
    $condition: ModelCompConditionInput
  ) {
    createComp(input: $input, condition: $condition) {
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
export const updateComp = /* GraphQL */ `
  mutation UpdateComp(
    $input: UpdateCompInput!
    $condition: ModelCompConditionInput
  ) {
    updateComp(input: $input, condition: $condition) {
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
export const deleteComp = /* GraphQL */ `
  mutation DeleteComp(
    $input: DeleteCompInput!
    $condition: ModelCompConditionInput
  ) {
    deleteComp(input: $input, condition: $condition) {
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
