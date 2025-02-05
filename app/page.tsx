'use client';

import { useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true); // Flag for initial user input

  // Load user data from local storage or start with empty fields
  const [editableUser, setEditableUser] = useState<User>(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('userData');
      return savedUser ? JSON.parse(savedUser) : { name: '', email: '', phone: '', address: '' };
    }
    return { name: '', email: '', phone: '', address: '' };
  });

  // Save user data to local storage when updated
  useEffect(() => {
    if (typeof window !== 'undefined' && editableUser.name) {
      localStorage.setItem('userData', JSON.stringify(editableUser));
    }
  }, [editableUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = () => {
    if (!editableUser.name || !editableUser.email || !editableUser.phone || !editableUser.address) {
      alert('Please fill out all fields.');
      return;
    }
    setIsEditing(false);
    setIsNewUser(false);
  };

  const handleEditClick = () => setIsEditing(true);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>

      {/* Initial User Input Form */}
      {isNewUser ? (
        <div className="p-6 border border-gray-300 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
          {['name', 'email', 'phone', 'address'].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-sm font-semibold capitalize">{field}</label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                className="w-full p-2 border border-gray-300 rounded-md"
                value={editableUser[field as keyof User]}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <button
            onClick={handleSaveClick}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Save
          </button>
        </div>
      ) : (
        // Editable User Information Card
        <div className="user-card mt-8 p-6 border border-gray-300 rounded-lg">
          {isEditing ? (
            <>
              {['name', 'email', 'phone', 'address'].map((field) => (
                <div className="mb-4" key={field}>
                  <label className="block text-sm font-semibold capitalize">{field}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={editableUser[field as keyof User]}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
              <button
                onClick={handleSaveClick}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold">{editableUser.name}</h2>
              <p className="text-sm text-gray-600">Email: {editableUser.email}</p>
              <p className="text-sm text-gray-600">Phone: {editableUser.phone}</p>
              <p className="text-sm text-gray-600">Address: {editableUser.address}</p>

              <button
                onClick={handleEditClick}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Edit
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
