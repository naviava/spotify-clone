"use client";

// React and Next.
import { useState } from "react";

// Custom hooks.
import { useUser } from "@/hooks/useUser";
import useSubscribeModal from "@/hooks/useSubscribeModal";

// Types.
import { Price, ProductWithPrice } from "@/types";

// Components.
import Modal from "./Modal";
import Button from "./Button";
import toast from "react-hot-toast";

// Lib and utils.
import { postData } from "@/lib/helpers";
import { getStripe } from "@/lib/stripeClient";

interface SubscribeModalProps {
  products: ProductWithPrice[];
}

function formatPrice(price: Price) {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);
  return priceString;
}

export default function SubscribeModal({ products }: SubscribeModalProps) {
  const subscribeModal = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  function onChange(open: boolean) {
    if (!open) subscribeModal.onClose();
  }

  async function handleCheckout(price: Price) {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error("Must be logged in.");
    }

    if (subscription) {
      setPriceIdLoading(undefined);
      return toast("Already subscribed.");
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (err) {
      toast.error((err as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  }

  let content = <div className="text-center">No products available.</div>;

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No prices available.</div>;
          }

          return product.prices.map((price) => (
            <Button
              key={price.id}
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === priceIdLoading}
              className="mb-4"
            >{`Subscribe for ${formatPrice(price)} for a ${
              price.interval
            }`}</Button>
          ));
        })}
      </div>
    );
  }

  if (subscription) {
    content = <div className="text-center">Already subscribed!</div>;
  }

  return (
    <Modal
      title="Upgrade to a Premium account"
      description="Upload your songs and make your own playlist"
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
}
