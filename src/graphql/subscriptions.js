/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateComp = /* GraphQL */ `
  subscription OnCreateComp {
    onCreateComp {
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
export const onUpdateComp = /* GraphQL */ `
  subscription OnUpdateComp {
    onUpdateComp {
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
export const onDeleteComp = /* GraphQL */ `
  subscription OnDeleteComp {
    onDeleteComp {
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
export const onCreateTime = /* GraphQL */ `
  subscription OnCreateTime {
    onCreateTime {
      id
      timeId
      timeString
      opponent
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTime = /* GraphQL */ `
  subscription OnUpdateTime {
    onUpdateTime {
      id
      timeId
      timeString
      opponent
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTime = /* GraphQL */ `
  subscription OnDeleteTime {
    onDeleteTime {
      id
      timeId
      timeString
      opponent
      createdAt
      updatedAt
    }
  }
`;
