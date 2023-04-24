import React from "react";
import { supabase_client } from "@/utils/supabase-client";

import { useAuth } from "@/contexts/AuthContext";

export default function Navbar({}) {
  const { session } = useAuth();

  const logout = async () => {
    const { error } = await supabase_client.auth.signOut();
  };

  return (
    <nav
      aria-label="Site Nav"
      className="mx-auto flex max-w-6xl items-center justify-between p-4 "
    >
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border-2">
        <span className="sr-only">Logo</span>
        <div className="avatar">
          <div className="w-10">
            <img
              src="/logo_small.png"
              className="rounded border border-black rounded"
            />
          </div>
        </div>
      </div>
      {session ? (
        <button
          onClick={logout}
          className="group relative inline-block focus:outline-none focus:ring cursor-pointer"
        >
          <span className="relative inline-block bg-white border-2 border-error border-current px-4 py-2 text-sm font-bold uppercase tracking-widest text-error group-active:text-opacity-75">
            Logout
          </span>
        </button>
      ) : (
        <label
          htmlFor="auth-modal"
          className="group relative inline-block focus:outline-none focus:ring cursor-pointer"
        >
          <span className="absolute inset-0 -translate-x-1.5 translate-y-1.5 bg-orange-200 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative inline-block bg-white border-2 border-current px-4 py-2 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
            Login/Signup
          </span>
        </label>
      )}
    </nav>
  );
}
