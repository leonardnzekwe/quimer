import { gql } from '@apollo/client';

export const CREATE_QUIZ_SESSION_MUTATION = gql`
mutation CREATE_QUIZ_SESSION_MUTATION($userId: Int, $testId: Int) {
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
        minutesDuration
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
      endTime
      score
    }
  }
}
`;

export const CREATE_USER_RESPONSE_MUTATION = gql`
mutation CREATE_USER_RESPONSE_MUTATION($sessionId: Int, $questionId: Int) {
  createUserResponse(input: {
    sessionId: $sessionId,
    questionId: $questionId,
  }) {
    userResponse {
      id
      session { id }
      question { id }
      chosenAnswer { id }
    }
  }
}
`;

export const UPDATE_USER_RESPONSE_MUTATION = gql`
mutation UPDATE_USER_RESPONSE_MUTATION($chosenAnswerId: Int, $id: Int!) {
  updateUserResponse(id: $id, input: {
    chosenAnswerId: $chosenAnswerId,
  }) {
    userResponse {
      id
      session { id }
      question { id }
      chosenAnswer { id }
    }
  }
}
`;
