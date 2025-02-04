"use client"; // Ensures this is a Client Component

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { UserDialog } from "./components/user-dialog";

const UserSearch = dynamic(() => import("./components/user-search"), { suspense: true });

export default function Home() {
  // State to track if edit mode is enabled
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("User Search"); // Editable Title

  function TechnicalOverview() {
    return (
      <section className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">How it works</h2>
        <p className="text-gray-700 dark:text-gray-300">
          The search functionality is implemented using a server action, which searches an array of pre-populated user data. The AsyncSelect component sends the search query to the server action, which filters the users based on a <code>startsWith</code> matching logic. When a user is selected from the dropdown, their details are displayed in a card component.
        </p>
      </section>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Editable Title */}
      {isEditing ? (
        <label className="block mb-4">
          <span className="sr-only">Edit title</span> {/* Hidden label for screen readers */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl font-bold p-2 border border-gray-400 rounded-lg w-full"
            aria-label="Edit title" // Accessibility improvement
            placeholder="Enter title" // Placeholder for user guidance
          />
        </label>
      ) : (
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <UserSearch />
      </Suspense>
      <UserDialog />

      {/* Edit Button */}
      <div className="mt-6 text-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all mr-2"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <TechnicalOverview />
    </div>
  );
}
