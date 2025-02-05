// import React from 'react';

// export const UserDialog = () => {
//   return (
//     <div className="mt-6 p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-xl font-semibold">User Details</h2>
//       <p className="mt-2 text-gray-600">Details about the selected user will appear here.</p>
//     </div>
//   );
// }
"use client";

import React, { useState, useEffect } from 'react';
import { getUserById } from '../actions/actions'; // Fetch user data
import { updateUser } from '../actions/actions'; // Function to update user data

interface UserDialogProps {
  userId: string;
}

const UserDialog: React.FC<UserDialogProps> = ({ userId }) => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const data = await getUserById(userId);
      setUser(data);
      setNewName(data?.name || "");
    }
    fetchUser();
  }, [userId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!user) return;
    
    await updateUser(userId, { name: newName }); // Call API to update user
    setUser({ name: newName }); // Update local state
    setIsEditing(false);
  };

  return (
    <div className="p-4 border rounded shadow-md">
      {user ? (
        <>
          {isEditing ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border p-2 rounded"
            />
          ) : (
            <p className="text-lg">{user.name}</p>
          )}

          <div className="mt-2">
            {isEditing ? (
              <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded">
                Save
              </button>
            ) : (
              <button onClick={handleEdit} className="bg-gray-500 text-white px-3 py-1 rounded">
                Edit
              </button>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDialog;
