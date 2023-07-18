"use client";

// React and Next.
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// External packages.
import toast from "react-hot-toast";

// Custom hooks.
import { useUser } from "@/hooks/useUser";
import useSubscribeModal from "@/hooks/useSubscribeModal";

// Components.
import Button from "@/components/Button";

// Lib and utils.
import { postData } from "@/lib/helpers";

interface AccountContentProps {}

export default function AccountContent({}: AccountContentProps) {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const [loading, setLoading] = useState(false);
  const { isLoading, subscription, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, router, user]);

  async function redirectToCustomerPortal() {
    setLoading(true);
    try {
      const { url, error } = await postData({ url: "/api/create-portal-link" });
      window.location.assign(url);
    } catch (err) {
      if (err) toast.error((err as Error).message);
    }
    setLoading(false);
  }

  return (
    <div className="mb-7 px-6">
      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>No active plan.</p>
          <Button onClick={subscribeModal.onOpen} className="w-[300px]">
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the{" "}
            <b>{subscription?.prices?.products?.name}</b> plan.
          </p>
          <Button
            onClick={redirectToCustomerPortal}
            disabled={loading || isLoading}
            className="w-[300px]"
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  );
}
