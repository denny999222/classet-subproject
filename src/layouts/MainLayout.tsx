import React, { useState } from "react";

// COMPONENTS
import Navbar from "@/components/Navbar";
import ModalLayout from "./ModalLayout";

// CONTEXT
import { useAuth } from "@/contexts/AuthContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useAuth();

  return (
    <div>
      <Navbar />
      <ModalLayout>
        <main className="max-w-6xl mx-auto flex min-h-screen flex-col p-24 w-full">
          {children}
        </main>
      </ModalLayout>
    </div>
  );
}
