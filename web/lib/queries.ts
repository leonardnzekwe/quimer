import { gql } from '@apollo/client';

export const FETCH_USER_DASHBOARD_DATA = gql`
query GET_USER_DASHBOARD_DATA($id: Int) {
  users(id: $id) {
    id
    username
    sessionSet { 
      id
      test { id,  title, description, minutesDuration, subject { id name } }
      startTime
      endTime
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
    minutesDuration
    subject { id name }
  },
  subjects {
    id
    name
  },
}
`;

export const GET_SESSION_SCORE_QUERY = gql`
query GET_SESSION_SCORE_QUERY($id: Int) {
  sessions(id: $id) {
    id
    score
  }
}
`;
