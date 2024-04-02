// @/app/components/password_change.tsx

import { useState } from 'react';
import axios from 'axios';
import { useSession, signOut } from "next-auth/react";


const PasswordChangeModal = () => {
  // Retrieve user session and status
  const { data: session } = useSession({ required: true });

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');

  // Set API URL
  const passwordChangeUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/auth/password/change/`;

  // Ensure session access token is valid before making the API call
  const accessToken = session?.access || "no_token";

  const handleChangePassword = async () => {
    try {
      // Perform validation for new passwords
      if (newPassword !== confirmNewPassword) {
        setPasswordChangeMessage('Passwords do not match.');
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

      // Log out the user after a delay (e.g., 3 seconds)
      // following successful password change
      setTimeout(async () => {
        // Close the modal after successful password change
        setIsChangePasswordModalOpen(false);

        await signOut({ callbackUrl: '/dashboard' });
      }, 3000); // 3 seconds delay before signing out
    } catch (error: any) {
      // Handle errors
      setPasswordChangeMessage("Failed to change password");
      console.log(error)
    }
  };

  return (
    <div>
      <button onClick={() => setIsChangePasswordModalOpen(true)} className="bg-neutral-500 hover:bg-amber-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-white">
        Change Password
      </button>
      {isChangePasswordModalOpen && (
        <div className="absolute top-0 right-0 bg-white text-black p-4 shadow-lg rounded-lg">
          {/* Modal for changing password */}
          <input
            type="text"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="block mb-2 border border-gray-300 rounded-md px-2 py-1"
          />
          <input
            type="text"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="block mb-2 border border-gray-300 rounded-md px-2 py-1"
          />
          <button onClick={handleChangePassword} className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-600 hover: focus:outline-none focus:ring focus:ring-neutral-500">
            Submit
          </button>
          <button onClick={() => setIsChangePasswordModalOpen(false)} className="bg-neutral-500 text-white px-3 py-1 rounded-md hover:bg-neutral-600 focus:outline-none focus:ring focus:ring-amber-200">
            Cancel
          </button>
          <p className="text-red-500">{passwordChangeMessage}</p>
        </div>
      )}
    </div>
  );
};

export default PasswordChangeModal;
