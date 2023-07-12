"use client";

// React and Next.
import { useEffect, useState } from "react";

// Components.
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";

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
      <UploadModal />
    </>
  );
}
