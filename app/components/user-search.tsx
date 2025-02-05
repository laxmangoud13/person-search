import React from 'react';

const UserSearch = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Search for a User</h2>
      <input
        type="text"
        placeholder="Search users..."
        className="mt-2 p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
}

export default UserSearch;
