import React, { useState } from 'react';

const UserSearch = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value); // Trigger the search callback with the query
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Search for a User</h2>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search users..."
        className="mt-2 p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default UserSearch; 