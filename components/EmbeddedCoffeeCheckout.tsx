"use client";

import { useCallback, useMemo } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");
}

const stripePromise = loadStripe(publishableKey);

export default function EmbeddedCoffeeCheckout() {
  const fetchClientSecret = useCallback(async () => {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to start checkout.");
    }

    return data.clientSecret;
  }, []);

  const options = useMemo(
    () => ({
      fetchClientSecret,
    }),
    [fetchClientSecret]
  );

  return (
    <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-3 shadow-sm sm:p-4">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}