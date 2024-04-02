'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';
import DefaultLoader, { SubmissionLoader } from '@/components/skeleton_loader';
import Link from 'next/link';

interface FormData {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}

export default function SignUp() {
  // Retrieve user session and status
  const { data: session, status } = useSession();

  // Use Router
  const router = useRouter();

  // Loading state for submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
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
    e.preventDefault();

    try {
      setIsSubmitting(true); // Set loading state to true when submission starts

      // Make a POST request to create a new user
      // Set API Endpoint
      const userCreationEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/`;
      await axios.post(userCreationEndpoint, formData);
      const { username, password } = formData;

      // If user creation is successful, sign in the user
      // then redirect to dashboard
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
        setErrorMessage('Sign in error occured, please try again later');
        console.error('Sign in failed:', signInResponse.error);
      }

    } catch (error: any) {
      // Handle error if user creation fails
      if (error.response && error.response.data) {
        // If the API returns an error array, concatenate the error messages into a single string
        const errorMessage = Object.values(error.response.data).join(' ');
        setErrorMessage(errorMessage);
      } else {
        // If no specific error message is returned, set a generic error message
        setErrorMessage('Sign up failed. Please try again.');
      }
      console.error('User creation failed:', error);
    } finally {
      setIsSubmitting(false); // Set loading state to false when submission finishes (success or failure)
    }
  };

  // useEffect to redirect to dashboard if session exists and is authenticated
  useEffect(() => {
    if (session && status === "authenticated") {
      router.push('/dashboard');
    }
  }, [session, status, router]);

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
      <div className="min-h-screen flex justify-center items-center text-white">
        <div className="bg-neutral-600 p-8 rounded shadow-md w-full max-w-md">
          <Link href="/" className='left-0 text-lg hover:text-amber-500'>Back 🏠</Link>
          <h1 className="text-3xl text-center font-bold mb-3 text-neutral-100">Sign Up</h1>
          <p className='text-center text-sm mb-3'>Hey 👋, your buddy <span className='animate-pulse text-amber-500 text-lg'>Quimer 🤗</span> awaits you!</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {['username', 'password', 'email', 'first_name', 'last_name'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-neutral-100 capitalize">{field}</label>
                <input
                  type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                  id={field}
                  name={field}
                  value={formData[field as keyof FormData]} // Use keyof FormData to ensure type safety
                  onChange={handleChange}
                  required
                  className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
                />
              </div>
            ))}
            {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
            <button type="submit" className="w-full bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-500 font-bold focus:outline-none focus:ring focus:ring-white">Sign Up</button>
          </form>
          <p className="text-neutral-100 text-center mt-4">Already have an account?</p>
          <button
            onClick={() => signIn(undefined, { callbackUrl: '/dashboard' })}
            className="bg-neutral-400 rounded-lg w-full py-2 px-4 mt-2 hover:bg-amber-500 font-bold focus:outline-none focus:ring focus:ring-white"
          >
            Sign In
          </button>
        </div>
        {/* Show loader when submitting data */}
        {isSubmitting && (<SubmissionLoader />)}
      </div>
    );
  }
}
