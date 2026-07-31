"use client";

import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { makePayment } from "../../_actions/makePayment";

interface PaymentButtonProps {
  bookingId: string;
}

export function PaymentButton({ bookingId }: PaymentButtonProps) {
  const [state, action, pending] = useActionState(makePayment, null);

  useEffect(() => {
    if (!state) return;

    if (!state.success) {
      toast.error(state.message || "Failed to start checkout");
    }
  }, [state]);

  return (
    <form action={action}>
      <input type="hidden" name="bookingId" value={bookingId} />

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
}
