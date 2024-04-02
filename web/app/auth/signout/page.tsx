'use client'

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import DefaultLoader from '@/components/skeleton_loader';
import { useEffect } from 'react';

export default function SignOut() {
  // Retrieve user session and status
  const { data: session, status } = useSession();

  const router = useRouter();

  // useEffect to redirect to signin if session does not exist
  useEffect(() => {
    if (!session && status === "unauthenticated") {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  // Loading state
  if (status === "loading") {
    return <DefaultLoader />; // Render default skeleton loader while loading
  }

  // return null when there is no session whilst (useEffect) routing to sigin
  // else return the signout page
  if (!session) {
    return null;
  } else {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <div className="bg-neutral-600 p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-3xl text-center font-bold mb-3">Sign Out</h1>
          <p className='text-center mb-3'>Hey buddy 😎, are you sure you want to sign out of <span className='animate-pulse text-amber-500 text-lg'>Quimer 🙁</span> , can&apos;t wait to have you back!</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => signOut({ redirect: false })} // Call the signout function
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-white"
            >
              Sign Out
            </button>
            <button
              onClick={() => router.back()} // Take user back to previous page
              className="bg-neutral-500 text-white py-2 px-4 rounded hover:bg-amber-500 focus:outline-none focus:ring focus:ring-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
};
