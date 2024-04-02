'use client'

import { useEffect, useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_QUIZ_SESSION_MUTATION, CREATE_USER_RESPONSE_MUTATION, UPDATE_USER_RESPONSE_MUTATION } from '@/lib/mutations';
import { GET_SESSION_SCORE_QUERY } from '@/lib/queries';
import { UserResponse, Question, QuizSession, Answer, QuizSessionQueryData } from '@/lib/types';
import { useSession } from 'next-auth/react';
import DefaultLoader from '@/components/skeleton_loader';
import Link from 'next/link';
import { formatTimeFromMilliseconds, formatDate } from '@/lib/utility_functions';

export default function QuizPage() {
    // Retrieve user session and status
    const { data: session, status } = useSession({ required: true });

    // Get test_id from query string only if window is defined (client-side)
    const queryString = typeof window !== 'undefined' ? window.location.search : '';
    const urlParams = new URLSearchParams(queryString);
    const testIdParam = urlParams.get('test_id');
    const testId = testIdParam ? parseInt(testIdParam) : null;

    const [quizSession, setQuizSession] = useState<QuizSession | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
    const [createQuizSession] = useMutation(CREATE_QUIZ_SESSION_MUTATION);
    const [createUserResponse] = useMutation(CREATE_USER_RESPONSE_MUTATION);
    const [updateUserResponse] = useMutation(UPDATE_USER_RESPONSE_MUTATION);
    const [quizEnded, setQuizEnded] = useState(false); // State to track if quiz has ended
    const [startQuiz, setStartQuiz] = useState(false); // Track if user has started the quiz
    const [remainingTime, setRemainingTime] = useState<number>(1); // Remaining time in milliseconds
    const { data: sessionScoreData, loading: sessionScoreLoading, error: sessionScoreError } = useQuery<QuizSessionQueryData>(GET_SESSION_SCORE_QUERY, {
        variables: { sessionId: quizSession?.id },
        skip: quizEnded === false // Skip fetching session score if quiz has not ended
    });

    const createQuizSessionFunc = useCallback(async () => {
        try {
            const response = await createQuizSession({
                variables: { userId: session?.user.id, testId: testId },
            });

            const createdSession: QuizSession = response.data.createSession.session;
            setQuizSession(createdSession);
            setQuestions(createdSession.test.questions);
            console.log('Created quiz session:', createdSession);

            // Create user responses for each question in the test
            const initialUserResponses: UserResponse[] = await Promise.all(
                createdSession.test.questions.map(async (question: Question) => {
                    const response = await createUserResponse({
                        variables: {
                            sessionId: parseInt(String(createdSession.id)),
                            questionId: parseInt(String(question.id)),
                        },
                    });
                    const createdUserResponse: UserResponse = response.data.createUserResponse.userResponse;
                    console.log('Created user response:', createdUserResponse);
                    return createdUserResponse;
                })
            );
            setUserResponses(initialUserResponses);
        } catch (error) {
            console.error('Error creating session:', error);
        }
    }, [createQuizSession, session, testId, createUserResponse]);

    useEffect(() => {
        if (session !== null && testId !== null && startQuiz === true && quizSession === null) {
            createQuizSessionFunc();
        }
    }, [session, testId, quizSession, startQuiz, createQuizSessionFunc]);

    const handleNextQuestion = async () => {
        // If there is no user response for the current question, create one
        if (!userResponses[currentQuestionIndex]?.id) {
            try {
                const response = await createUserResponse({
                    variables: {
                        sessionId: parseInt(String(quizSession?.id)),
                        questionId: parseInt(String(questions[currentQuestionIndex]?.id)),
                    },
                });
                const newUserResponse: UserResponse = response.data.createUserResponse.userResponse;
                setUserResponses(prevResponses => {
                    const newResponses = [...prevResponses];
                    newResponses[currentQuestionIndex] = newUserResponse;
                    return newResponses;
                });
                console.log('New user response:', newUserResponse);
            } catch (error) {
                console.error('Error creating user response:', error);
            }
        }
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    const handleUserResponse = async (chosenAnswerId: number) => {
        // Update the user response for the current question
        try {
            const response = await updateUserResponse({
                variables: {
                    id: parseInt(String(userResponses[currentQuestionIndex]?.id)),
                    chosenAnswerId: parseInt(String(chosenAnswerId)),
                },
            });
            const updatedUserResponse: UserResponse = response.data.updateUserResponse.userResponse;
            setUserResponses(prevResponses => {
                const newResponses = [...prevResponses];
                newResponses[currentQuestionIndex] = updatedUserResponse;
                return newResponses;
            });
            console.log('Updated user response:', updatedUserResponse);
        } catch (error) {
            console.error('Error updating user response:', error);
        }
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    };

    const calculateRemainingTime = useCallback(() => {
        if (quizSession === null || quizSession.startTime === null || quizSession.endTime === null) return 0;

        const startTime = new Date(quizSession.startTime).getTime();
        const endTime = new Date(quizSession.endTime).getTime();
        const currentTime = new Date().getTime();

        // If the current time is before the start time, return the full duration in milliseconds
        if (currentTime < startTime) {
            return endTime - startTime;
        }

        // If the current time is after the end time, return 0
        if (currentTime > endTime) {
            return 0;
        }

        // Otherwise, return the remaining time in milliseconds
        return endTime - currentTime;
    }, [quizSession]);

    const handleAutoSubmit = useCallback(() => {
        // Automatically submit the quiz when time runs out
        // happens by stopping to show the questions and answers
        // by setting the quizEnded to true
        // then showing the session score
        console.log('Automatic submission...');
        // set the quiz ended to true
        setQuizEnded(true);
    }, []);

    // Update remaining time and auto-submit when quiz ends
    useEffect(() => {
        if (quizSession === null || startQuiz === false || quizEnded === true) return;

        if (remainingTime === 0) {
            handleAutoSubmit();
        }

        const timer = setInterval(() => {
            const calculatedRemainingTime = calculateRemainingTime();
            setRemainingTime(calculatedRemainingTime);
        }, 1000);


        // Clean up interval when component unmounts or when quiz ends
        return () => clearInterval(timer);
    }, [quizSession, calculateRemainingTime, startQuiz, handleAutoSubmit, quizEnded, remainingTime]);


    // Render loading state while fetching session score
    if (sessionScoreLoading === true && quizEnded === true) {
        return <DefaultLoader />;
    }

    // Render error if fetching session score fails
    if (sessionScoreError) {
        console.error('Error fetching session score:', sessionScoreError);
    }

    if (startQuiz === false) {
        return (
            <div className="container mx-auto mt-4 p-4 text-center text-white">
                <div className="max-w-lg mx-auto">
                    <p className="text-lg mb-4">Hey buddy👋, make <span className='animate-pulse text-amber-500 text-lg'>Quimer 🤗</span> your prep buddy.</p>
                    <p className="text-lg font-semibold mb-4 underline underline-offset-8">Please read the instructions carefully before starting</p>
                    <ol className="text-left mb-4 list-decimal">
                        <li>There are multiple choice questions in this quiz.</li>
                        <li>Each question has a single correct answer.</li>
                        <li>Click on the answer you think is correct.</li>
                        <li>You can navigate between questions using the &quot;Previous&quot; and &quot;Next&quot; buttons.</li>
                        <li>Once you have answered all the questions, click on the &quot;Submit&quot; button to finish the quiz.</li>
                        <li>The Quiz duration is 2 minutes.</li>
                        <li>Do not refresh the page during the quiz.</li>
                        <li>Do not use the browser back button during the quiz.</li>
                        <li>Do not close the browser tab during the quiz.</li>
                        <li>You cannot go back to the quiz once it is submitted.</li>
                        <li>The quiz will be automatically submitted if the time runs out.</li>
                        <li>After Submission you will see your score.</li>
                    </ol>
                    <p className="mb-4">Click the button below to start the quiz </p>
                    <p className="mb-4">Good luck! 🍀</p>
                    <div className='flex flex-row space-x-4 justify-center'>
                        <Link
                            href="/dashboard"
                            className="w-fit bg-neutral-500 py-2 px-4 rounded hover:bg-amber-500">
                            Go Back
                        </Link>
                        <button
                            onClick={() => setStartQuiz(true)}
                            className="bg-neutral-500 w-fit px-4 py-2 rounded-md hover:bg-amber-500 focus:outline-none focus:bg-amber-600">Start Quiz</button>
                    </div>
                </div>
            </div>
        );
    }

    // Loading state
    if (status === "loading" || quizSession === null) {
        return <DefaultLoader />; // Render default skeleton loader while loading
    }

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-lg mx-auto text-white">
                {quizSession !== null && quizEnded === false &&
                    <div className="flex flex-col justify-center items-center">
                        {/* Display submit button */}
                        <div className="flex flex-row space-x-4 mb-3">
                            <h1 className="text-3xl font-bold">Quiz Session</h1>
                            <button onClick={handleAutoSubmit} className="bg-neutral-500 p-2 rounded-md hover:bg-amber-500 focus:outline-none focus:bg-amber-500">Submit Quiz</button>
                        </div>
                        <p className="text-lg mb-4">Hey buddy👋, <span className='animate-pulse text-amber-500 text-lg'>Quimer 🤗</span> is rooting for you.</p>
                        {/* Display session info */}
                        <div className="mb-4">
                            <p>Test Title: {quizSession?.test.title}</p>
                            <p>Description: {quizSession?.test.description}</p>
                            <p>Subject: {quizSession?.test.subject.name}</p>
                            <p>Start Time: {formatDate(quizSession?.startTime)}</p>
                            <p>End Time: {formatDate(quizSession?.endTime)}</p>
                            <p>Remaining Time: {formatTimeFromMilliseconds(remainingTime)}</p>
                        </div>

                        {/* Display current question and answers */}
                        <p className="text-lg mb-4">Question {currentQuestionIndex + 1} of {questions.length}</p>
                        <h2 className="text-2xl font-bold mb-4">{questions[currentQuestionIndex]?.text}</h2>
                        <ul className="flex flex-row space-x-4">
                            {questions[currentQuestionIndex]?.answers.map((answer: Answer) => (
                                <li key={answer.id} className={`mb-2 ${parseInt(String(userResponses[currentQuestionIndex]?.chosenAnswer?.id)) === parseInt(String(answer.id)) ? 'bg-green-500 rounded-lg' : ''}`}
                                >
                                    <button
                                        onClick={() => handleUserResponse(answer.id)}
                                        className="px-4 py-2 rounded-lg hover:bg-amber-500 border border-white">
                                        {answer.text}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Navigation buttons */}
                        <div className="mt-4 flex flex-row space-x-4">
                            <button
                                disabled={currentQuestionIndex === 0}
                                onClick={handlePreviousQuestion}
                                className={`bg-neutral-500 px-4 py-2 rounded-md hover:bg-amber-500 ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed hover:bg-neutral-500' : ''}`}>
                                Previous
                            </button>
                            <button
                                disabled={currentQuestionIndex === questions.length - 1}
                                onClick={handleNextQuestion}
                                className={`bg-neutral-500 px-4 py-2 rounded-md hover:bg-amber-500  ${currentQuestionIndex === questions.length - 1 ? 'opacity-50 cursor-not-allowed hover:bg-neutral-500' : ''}`}>
                                Next
                            </button>
                        </div>
                    </div>
                }

                {/* Display session score after submission */}
                {sessionScoreData !== null && quizEnded === true && (
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-2xl font-bold mb-4">Quiz has Ended 💪</h2>
                        <p className="text-sm mb-4">Hey buddy👋, big congrats 🎊 from <span className='animate-pulse text-amber-500 text-lg'>Quimer 🤗</span> on completing the quiz.</p>
                        <p className='font bold mb-4'>Your scored <span className='underline underline-offset-8'>{sessionScoreData?.sessions[0]?.score.toFixed(2)}%</span> in the just concluded session test.</p>
                        <Link href="/dashboard" className="bg-neutral-500 rounded-lg hover:bg-amber-500 p-3">
                            Return to Dashboard, Good luck! 🍀
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
