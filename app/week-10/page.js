"use client";

import { useState } from "react";
import Link from "next/link";
import { useUserAuth } from "../../contexts/AuthContext";

export default function Page() {
  const auth = useUserAuth() || {};
  const { user, gitHubSignIn, firebaseSignOut } = auth;
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");
    if (!gitHubSignIn) {
      return;
    }
    try {
      await gitHubSignIn();
    } catch (e) {
      setError(e?.message || String(e));
    }
  };

  const handleSignOut = async () => {
    setError("");
    if (!firebaseSignOut) {
      setError("Auth not available");
      return;
    }
    try {
      await firebaseSignOut();
    } catch (e) {
      setError(e?.message || String(e));
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Welcome to my web dev app!</h1>

        {error && <p className="text-sm text-red-400 mb-3">{error}</p>}

        {!user ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-300">Please sign in to continue.</p>
            <button
              onClick={handleSignIn}
              className="bg-blue-600 px-4 py-2 rounded"
            >
              Sign in with GitHub
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm">
              Welcome, <strong>{user.displayName || user.email}</strong>
            </p>

            <div className="flex items-center gap-2">
              <button onClick={handleSignOut} className="bg-red-600 px-3 py-2 rounded">
                Log out
              </button>

              <Link href="/week-10/shopping-list" className="bg-green-600 px-3 py-2 rounded">
                Open shopping list
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}