import { gql } from '@apollo/client';

export const CREATE_USER_QUIZ = gql`
mutation CREATE_USER_QUIZ($userId: ID, $testId: ID) {
  createSession(input: {
    userId: $userId,
    testId: $testId,
  }) {
    session {
      id
      test {
        id
        title
        description
        subject { id name}
        questions {
          id
          text
          answers {
            id
            text
          }
        }
      }
      startTime
      timeLimit
      score
      isExpired
      userresponseSet {
        id
        question { id }
        chosenAnswer { id }
      }
    }
  }
}
`;
