'use client'

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Error() {
  // Get a copy of the search parameters
  const searchParams = useSearchParams()

  // Get the Query/Search Parameters
  const errorParam = searchParams.get('error');

  // Ensure parameters are parsed to numbers correctly
  const error = errorParam ? errorParam : 'Unknown Error';

  // Function to get error message based on error code
  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'Configuration':
        return 'There is a problem with the server configuration. Please check if your options are correct.';
      case 'AccessDenied':
        return 'Access Denied. This usually occurs when access is restricted through the sign-in callback or redirect callback.';
      case 'Verification':
        return 'Verification Error. This is related to the Email provider. The token has expired or has already been used.';
      case 'Default':
        return 'An unexpected error occurred. Please try again later.';
      default:
        return 'An unexpected error occurred. Please try again later.';
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center text-white">
      <div className="bg-neutral-900 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl text-center font-bold mb-3">Oops, <span className='animate-pulse text-amber-500'>Quimer 😯</span> Issues!</h1>
        <p className="mb-4">
          {error && getErrorMessage(error as string)}
        </p>
        <Link
          href="/"
          className="block w-full bg-neutral-500 text-white py-2 px-4 rounded hover:bg-amber-500 text-center">
          Return to Home 🏠
        </Link>
      </div>
    </div>
  );
};