import React from "react";

// COMPONENTS
import AuthModal from "@/components/AuthModal";

export default function ModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <AuthModal />
    </>
  );
}
