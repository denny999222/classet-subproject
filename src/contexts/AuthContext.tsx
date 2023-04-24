import React, { createContext, useEffect, useState, useContext } from "react";
import { supabase_client } from "@/utils/supabase-client";
import { Session } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase_client.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase_client.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    session,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
