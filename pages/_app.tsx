import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";

// COMPONENTS
import MainLayout from "@/layouts/MainLayout";

// CONTEXTS
import { AuthProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </AuthProvider>
  );
}
