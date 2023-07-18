"use client";

// React and Next.
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// External packages.
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

// Custom hooks.
import useAuthModal from "@/hooks/useAuthModal";

// Components.
import Modal from "./Modal";

export default function AuthModal() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { isOpen, onClose } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  function onChange(open: boolean) {
    if (!open) onClose();
  }

  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        magicLink
        theme="dark"
        providers={["google", "twitter", "github"]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: { colors: { brand: "#404040", brandAccent: "#22c55e" } },
          },
        }}
      />
    </Modal>
  );
}
