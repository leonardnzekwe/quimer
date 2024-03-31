"use client"

// Import necessary dependencies and styles
import { useSession } from "next-auth/react";
import PasswordChangeModal from "@/components/password_change";
import { DashboardLoader } from "@/components/skeleton_loader"
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useQuery, gql } from '@apollo/client';
import { FETCH_USER_DASHBOARD_DATA } from "@/lib/queries";
import { User, Session } from "@/lib/types";
import { useState } from "react";

// Define the Dashboard component
export default function Dashboard() {
  // Retrieve user session and status
  const { data: session, status } = useSession({ required: true });

  // Use Router
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false); // State variable for sidebar visibility

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
    return <div>Error fetching data</div>;
  }

  // If there is no session, redirect to signin
  // else render dashboard
  if (!session && status === "unauthenticated") {
    router.push('/auth/signin')
    return null; // return null whilst routing
  } else {
    return (
      <div className="m-8 relative">
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
            <button onClick={() => { setSidebarOpen(!sidebarOpen); }} className="px-4 py-2 bg-neutral-500 text-white rounded-lg hover:bg-amber-500">
              😎 Menu
            </button>
          </div>
        </div>

        {/* Sidebar */}
        {sidebarOpen &&
          <div className={`flex bg-gray-800 h-full text-white ${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 ease-in-out`}>
            {/* Sidebar content */}
            <ul className="pt-6">
              <li className="px-4 py-2 hover:bg-gray-700">Menu Item 1</li>
              <li className="px-4 py-2 hover:bg-gray-700">Menu Item 2</li>
              {/* Add more menu items as needed */}
            </ul>
          </div>
        }

        {/* Centered below the top left and top right */}
        <div className="mt-20">
          <p className="text-center text-white text-lg mb-4">Hey 👋, its <span className='animate-pulse text-amber-500 text-lg'>Quimer 🤗</span> your prep buddy.</p>
          <p className="capitalize text-center text-white text-lg mb-4">Member Since: {session.user.date_joined} </p>
          <p className="capitalize text-center text-white text-lg mb-4">Last Login: {session.user.last_login} </p>
        </div>

        {/* Display user's test scores for each session */}
        <div className="mt-20">
          {data.users.map((user: User) => (
            <div key={user.id}>
              <p className="capitalize text-center text-white text-lg mb-4">Test Scores:</p>
              {user.sessionSet.map((session: Session) => (
                <div key={session.id}>
                  <p className="text-center text-white text-lg mb-2">Title: {session.test.title}</p>
                  <p className="text-center text-white text-lg mb-2">Description: {session.test.description}</p>
                  <p className="text-center text-white text-lg mb-2">Score: {session.score}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
