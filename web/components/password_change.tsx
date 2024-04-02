import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useSession, signOut } from "next-auth/react";
import { SubmissionLoader } from './skeleton_loader';


const PasswordChangeModal = () => {
  // Retrieve user session and status
  const { data: session } = useSession({ required: true });

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set API URL
  const passwordChangeUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/auth/password/change/`;

  // Ensure session access token is valid before making the API call
  const accessToken = session?.access || "no_token";

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      setIsSubmitting(true); // Set loading state to true when submission starts

      // Perform validation for new passwords
      if (!newPassword || !confirmNewPassword) {
        setPasswordChangeMessage("The password fields can't be empty.");
        return;
      }

      // Call the API endpoint for password change
      const response = await axios.post(
        passwordChangeUrl,
        { new_password1: newPassword, new_password2: confirmNewPassword },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      // Show Success Message
      setPasswordChangeMessage(response.data.detail);

      // Log out the user after a delay (e.g., 2 seconds)
      // following successful password change
      setTimeout(async () => {
        // Close the modal after successful password change
        setIsChangePasswordModalOpen(false);

        await signOut({ redirect: false, callbackUrl: '/dashboard' });
      }, 2000); // 2 seconds delay before signing out
    } catch (error: any) {
      // Handle error if user creation fails
      if (error.response && error.response.data) {
        // If the API returns an error array, concatenate the error messages into a single string
        const errorMessage = Object.values(error.response.data).join(' ');
        setPasswordChangeMessage(errorMessage);
      } else {
        setPasswordChangeMessage("Failed to change password");
      }
      console.log('Password change failed:', error);
    } finally {
      setIsSubmitting(false); // Set loading state to false when submission finishes (success or failure)
    }
  };

  return (
    <div>
      <button onClick={() => setIsChangePasswordModalOpen(true)} className="bg-neutral-500 hover:bg-amber-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-white">
        Change Password
      </button>
      {isChangePasswordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-neutral-300 p-4 shadow-lg rounded-lg max-w-md w-full">
            {/* Modal content */}
            <h2 className="text-lg font-semibold text-black text-center mb-2">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="text-black block mb-2 border border-gray-300 rounded-md px-2 py-1 w-full"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
                className="text-black block mb-2 border border-gray-300 rounded-md px-2 py-1 w-full"
              />
              <p className="text-red-500 mt-3 text-center">{passwordChangeMessage}</p>
              <div className='flex flex-row justify-center mt-3'>
                <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-600 focus:outline-none focus:ring focus:ring-neutral-500">
                  Submit
                </button>
                <button
                  onClick={() => {
                    setIsChangePasswordModalOpen(false);
                    setPasswordChangeMessage('');
                  }}
                  type="button"
                  className="bg-neutral-500 text-white px-3 py-1 rounded-md hover:bg-neutral-600 focus:outline-none focus:ring focus:ring-amber-200">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Show loader when submitting data */}
      {isSubmitting && (<SubmissionLoader />)}
    </div>
  );
};

export default PasswordChangeModal;
