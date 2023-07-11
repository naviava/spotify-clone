"use client";

// React and Next.
import { useEffect, useState } from "react";

// Components.
import Modal from "@/components/Modal";
import AuthModal from "@/components/AuthModal";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevents hydration errors.
  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
    </>
  );
}
