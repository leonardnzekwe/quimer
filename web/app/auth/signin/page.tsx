'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { signIn, useSession } from 'next-auth/react';
import DefaultLoader, { SubmissionLoader } from '@/components/skeleton_loader';
import Link from 'next/link';

interface FormData {
  username: string;
  password: string;
}

export default function SignUp() {
  // Retrieve user session and status
  const { data: session, status } = useSession();

  // Use Router
  const router = useRouter();

  // Get test_id from query string only if window is defined (client-side)
  const queryString = typeof window !== 'undefined' ? window.location.search : '';
  const urlParams = new URLSearchParams(queryString);
  const callbackUrlParam = urlParams.get('callbackUrl');
  const callbackUrlString = callbackUrlParam ? callbackUrlParam : '/dashboard';

  // Loading state for submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      setIsSubmitting(true); // Set loading state to true when submission starts

      // Get Form Data
      const { username, password } = formData;

      // Attempt Signin
      const signInResponse = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      // If signInResponse is truthy and contains an error, its a failure
      // else it doesn't contain an error, it's considered successful
      // then the flow wouldn't get here,
      // the SignIn redirect would take effect using the callbackUrl
      if (signInResponse && signInResponse.error) {
        setErrorMessage('Invalid username or password. Please try again.');
        console.error('Sign in failed:', signInResponse.error);
      }

    } catch (error: any) {
      /// Handle error if sign-in fails
      setErrorMessage('Invalid username or password. Please try again.');
      console.error('Sign in failed:', error);
    } finally {
      setIsSubmitting(false); // Set loading state to false when submission finishes (success or failure)
    }
  };

  // useEffect to redirect to the `callbackUrlString` or dashboard if session exists and is authenticated
  useEffect(() => {
    if (session && status === "authenticated") {
      router.push(callbackUrlString);
    }
  }, [session, status, router, callbackUrlString]);

  // Loading state
  if (status === "loading") {
    return <DefaultLoader />; // Render default skeleton loader while loading
  }

  // return null when there is session whilst (useEffect) routing to dashboard
  // else return the signin page
  if (session) {
    return null;
  } else {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-neutral-600 p-8 rounded shadow-md w-full max-w-md">
          <Link href="/" className='left-0 text-white text-lg hover:text-amber-500'>Back 🏠</Link>
          <h1 className="text-3xl text-center font-bold mb-3 text-neutral-100">Sign In</h1>
          <p className='text-center text-sm'>Hey 👋 Buddy, its <span className='animate-pulse text-amber-500 text-lg'>Quimer 🤗</span></p>
          <p className='text-center mb-3 text-sm'>Ready to jump back in? 💪</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {['username', 'password'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-neutral-100 capitalize">{field}</label>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  id={field}
                  name={field}
                  value={formData[field as keyof FormData]} // Use keyof FormData to ensure type safety
                  onChange={handleChange}
                  required
                  className="text-black mt-1 w-full rounded-md border-amber-300 shadow-sm focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
                />
              </div>
            ))}
            {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
            <button type="submit" className="w-full bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-500 focus:outline-none focus:ring focus:ring-amber-500 focus:ring-opacity-50">Sign In</button>
          </form>
          <p className="text-neutral-100 text-center mt-4">Don&apos;t have an account yet?</p>
          <button
            onClick={() => { window.location.href = "/auth/signup"; }}
            className="bg-neutral-400 rounded-lg w-full py-2 px-4 mt-2 hover:bg-amber-500 font-bold focus:outline-none focus:ring focus:ring-amber-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </div>
        {/* Show loader when submitting data */}
        {isSubmitting && (<SubmissionLoader />)}
      </div>
    );
  }
}
