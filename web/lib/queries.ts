import { gql } from '@apollo/client';

export const FETCH_USER_DASHBOARD_DATA = gql`
query GET_USER_DASHBOARD_DATA($id: Int) {
  users(id: $id) {
    id
    username
    sessionSet { 
      id
      test { id,  title, description }
      startTime
      timeLimit
      score  
    }
  },
  issuers {
    id
    name
    description
  },
  tests {
    id
    title
    dateCreated
    description
    subject { id name }
  },
  subjects {
    id
    name
  },
}
`;
