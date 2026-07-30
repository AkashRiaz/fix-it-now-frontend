 
"use client"

import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { makePayment } from "../../_actions/makePayment";

export function PaymentButton() {
    const [state, action, pending] = useActionState(makePayment, null);

    useEffect(() => {
        if (!state) return;

        if (!state.success) {
            toast.error(state.message || "Failed to start checkout");
        }
    }, [state]);

    return (
        <form action={action}>
            <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Redirecting..." : "Subscribe Now"}
            </Button>
        </form>
    )
}