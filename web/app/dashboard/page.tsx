"use client"

// Import necessary dependencies and styles
import { useSession } from "next-auth/react";
import PasswordChangeModal from "@/components/password_change";
import { DashboardLoader } from "@/components/skeleton_loader"
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useQuery } from '@apollo/client';
import { FETCH_USER_DASHBOARD_DATA } from "@/lib/queries";
import { User, Session, Issuer, Subject, Test } from "@/lib/types";
import { useState } from "react";

// Define the Dashboard component
export default function Dashboard() {
  // Retrieve user session and status
  const { data: session, status } = useSession({ required: true });

  // Use Router
  const router = useRouter();

  // State to manage visibility of menu items
  const [showSubjects, setShowSubjects] = useState(false);
  const [showIssuers, setShowIssuers] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showTests, setShowTests] = useState(false);
  const [showSessions, setShowSessions] = useState(false);

  // Fetch user dashboard data
  const { loading, error, data } = useQuery(FETCH_USER_DASHBOARD_DATA, {
    variables: { id: session?.user.id }
  });

  // Loading state
  if (status === "loading" || loading) {
    return <DashboardLoader />; // Render dashboard skeleton loader while loading
  }

  // If there is an error, display the error message
  if (error) {
    console.error("Error fetching user dashboard data:", error);
    router.push('/auth/error');
    return null; // return null whilst routing
  }

  // Function to toggle section visibility and set others to false
  const handleSectionClick = (section: String) => {
    setShowSubjects(section === 'subjects' ? !showSubjects : false);
    setShowIssuers(section === 'issuers' ? !showIssuers : false);
    setShowQuiz(section === 'quiz' ? !showQuiz : false);
    setShowTests(section === 'tests' ? !showTests : false);
    setShowSessions(section === 'sessions' ? !showSessions : false);
  };

  // If there is no session, redirect to signin
  // else render dashboard
  if (!session && status === "unauthenticated") {
    router.push('/auth/signin')
    return null; // return null whilst routing
  } else {
    return (
      <div className="relative flex h-screen text-white">
        {/* Sidebar */}
        <div className="flex flex-col justify-center">
          <div className="fixed rounded-lg my-4 ml-2 bg-neutral-800 h-fit w-16 hover:w-fit animate-pulse hover:animate-none">
            {/* Sidebar content */}
            <ul className="py-6 items-center group text-center">
              <li><button
                onClick={() => handleSectionClick('subjects')}
                className="rounded-lg px-4 py-2 hover:bg-amber-500">📒 <span className="hidden group-hover:block">Subjects</span>
              </button></li>
              <li><button
                onClick={() => handleSectionClick('tests')}
                className="rounded-lg px-4 py-2 hover:bg-amber-500">💯 <span className="hidden group-hover:block">Tests</span>
              </button></li>
              <li><button
                onClick={() => handleSectionClick('issuers')}
                className="rounded-lg px-4 py-2 hover:bg-amber-500">🤲 <span className="hidden group-hover:block">Issuers</span>
              </button></li>
              <li><button
                onClick={() => handleSectionClick('sessions')}
                className="rounded-lg px-4 py-2 hover:bg-amber-500">📝 <span className="hidden group-hover:block">Sessions</span>
              </button></li>
              <li><button
                onClick={() => handleSectionClick('quiz')}
                className="rounded-lg px-4 py-2 hover:bg-amber-500">💪 <span className="hidden group-hover:block">Quiz</span>
              </button></li>
            </ul>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex flex-col flex-1">
          {/* Top bar */}
          <div className="p-4">
            {/* Dashboard Navigation Section */}
            <div className="sticky top-0 z-50 bg-white/10 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <p className="capitalize text-lg text-white">Hello {session.user.username || 'boss'},</p>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/" className='px-4 py-2 bg-neutral-500 text-white rounded-lg hover:bg-amber-500'>Home</Link>
                <PasswordChangeModal />
                <button onClick={() => { window.location.href = "/auth/signout"; }} className="px-4 py-2 bg-neutral-500 text-white rounded-lg hover:bg-amber-500">
                  Sign out
                </button>
              </div>
            </div>
          </div>

          {/* Page content */}
          <div className="flex-1 p-4">
            {/* Welcome Message */}
            <div className="mt-20">
              <p className="text-center text-white text-lg mb-4">Hey 👋, its <span className='animate-pulse text-amber-500 text-lg'>Quimer 🤗</span> your prep buddy.</p>
              <p className="capitalize text-center text-white text-lg mb-4">Member Since: {session.user.date_joined} </p>
              <p className="capitalize text-center text-white text-lg mb-4">Last Login: {session.user.last_login} </p>
            </div>
          </div>

          {/* Body Section For the Conditional Rendering */}
          <div className="flex-1 p-4">
            {/* Display user's Session Test scores */}
            {showSessions && data.users && data.users.length > 0 && data.users[0].sessionSet && data.users[0].sessionSet.length > 0 ? (
              <div className="flex flex-col items-center mt-10">
                <p className="capitalize text-center text-lg mb-4">Session Test Scores:</p>
                <div className=" bg-neutral-900 rounded-lg w-fit p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.users.map((user: User) => (
                    user.sessionSet.map((session: Session) => (
                      <div key={session.id} className="bg-neutral-800 rounded-lg p-4">
                        <p className="text-center text-lg mb-2">Title: {session.test.title}</p>
                        <p className="text-center text-lg mb-2">Description: {session.test.description}</p>
                        <p className="text-center text-lg mb-2">Start Time: {session.startTime}</p>
                        <p className="text-center text-lg mb-2">Time Limit: {session.timeLimit} Minutes</p>
                        <p className="text-center text-lg mb-2">Score: {session.score}</p>
                      </div>
                    ))
                  ))}
                </div>
              </div>
            ) : showSessions ? (
              <div className="flex flex-col items-center mt-10">
                <p className="capitalize text-center text-lg mb-4">No Session Test Score Available</p>
              </div>
            ) : null}

            {/* Display Issuers */}
            {showIssuers && data.issuers && data.issuers.length > 0 ? (
              <div className="flex flex-col items-center mt-10">
                <p className="capitalize text-center text-lg mb-4">Registered Issuers:</p>
                <div className=" bg-neutral-900 rounded-lg w-fit p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.issuers.map((issuer: Issuer) => (
                    <div key={issuer.id} className="bg-neutral-800 rounded-lg p-4">
                      <p className="text-center text-lg mb-2">Name: {issuer.name}</p>
                      <p className="text-center text-lg mb-2">Description: {issuer.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : showIssuers ? (
              <div className="flex flex-col items-center mt-10">
                <p className="capitalize text-center text-lg mb-4">No Issuers Available</p>
              </div>
            ) : null}

            {/* Display Subjects */}
            {showSubjects && data.subjects && data.subjects.length > 0 ? (
              <div className="flex flex-col items-center mt-10">
                <p className="capitalize text-center text-lg mb-4">Available Subjects:</p>
                <div className=" bg-neutral-900 rounded-lg w-fit p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.subjects.map((subject: Subject) => (
                    <div key={subject.id} className="bg-neutral-800 rounded-lg p-4">
                      <p className="text-center text-lg mb-2">Name: {subject.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : showSubjects ? (
              <div className="flex flex-col items-center mt-10">
                <p className="capitalize text-center text-lg mb-4">No Subjects Available</p>
              </div>
            ) : null}

            {/* Display Tests */}
            {showTests && data.tests && data.tests.length > 0 ? (
              <div className="flex flex-col items-center mt-10">
                <p className="capitalize text-center text-lg mb-4">Available Tests:</p>
                <div className=" bg-neutral-900 rounded-lg w-fit p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.tests.map((test: Test) => (
                    <div key={test.id} className="bg-neutral-800 rounded-lg p-4">
                      <p className="text-center text-lg mb-2">Title: {test.title}</p>
                      <p className="text-center text-lg mb-2">Description: {test.description}</p>
                      <p className="text-center text-lg mb-2">Subject: {test.subject.name}</p>
                      <p className="text-center text-lg mb-2">Date Created: {test.dateCreated}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : showTests ? (
              <div className="flex flex-col items-center mt-10">
                <p className="capitalize text-center text-lg mb-4">No Tests Available</p>
              </div>
            ) : null}

          </div>
        </div>
      </div>
    );
  }
}