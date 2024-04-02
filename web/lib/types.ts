export interface Issuer {
  id: number;
  name: string;
  description: string | null;
}

export interface IssuedYear {
  id: number;
  year: number;
}

export interface Subject {
  id: number;
  name: string;
}

export interface Topic {
  id: number;
  name: string;
}

export interface Test {
  id: number;
  title: string;
  dateCreated: string; // This should be a string representing a date-time format
  description: string | null;
  subject: Subject;
  questions: Question[];
  minutesDuration: number;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
  subject: Subject;
  topic: Topic;
  issuer: Issuer;
  issued_year: IssuedYear;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface Answer {
  id: number;
  text: string;
  is_correct: boolean;
}

export interface QuizSession {
  id: number;
  user: User;
  test: Test;
  startTime: string; // This should be a string representing a date-time format
  endTime: string, // This should be a string representing a date-time format
  score: number;
}

export interface User {
  id: number;
  username: string;
  sessionSet: QuizSession[];
}

export interface UserResponse {
  id: number;
  session: QuizSession;
  question: Question;
  chosenAnswer: Answer;
}

export interface QuizSessionQueryData {
  sessions: QuizSession[];
}