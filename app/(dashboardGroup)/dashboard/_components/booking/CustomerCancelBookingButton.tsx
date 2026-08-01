"use client";

import { useState, useTransition } from "react";
import { AlertTriangle, LoaderCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cancelBookingAction } from "../../_actions/bookingActions";
import type { BookingStatus } from "@/lib/type";

type CustomerCancelBookingButtonProps = {
  bookingId: string;
  status: BookingStatus;
  paymentStatus?: string | null;
};

const cancellableStatuses: BookingStatus[] = ["REQUESTED", "ACCEPTED"];

const CustomerCancelBookingButton = ({
  bookingId,
  status,
  paymentStatus,
}: CustomerCancelBookingButtonProps) => {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const canCancel =
    cancellableStatuses.includes(status) && paymentStatus !== "COMPLETED";

  if (!canCancel) {
    return null;
  }

  const handleCancel = () => {
    startTransition(async () => {
      const result = await cancelBookingAction(bookingId);

      if (!result?.success) {
        toast.error(result?.message || "Failed to cancel booking");
        return;
      }

      toast.success(result?.message || "Booking cancelled successfully");

      setOpen(false);
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!pending) {
          setOpen(value);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <XCircle className="mr-2 size-4" />
          Cancel
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="size-5 text-red-600" />
          </div>

          <DialogTitle>Cancel this booking?</DialogTitle>

          <DialogDescription>
            This action will cancel your booking request. You cannot undo this
            action.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            onClick={() => setOpen(false)}
          >
            Keep Booking
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={pending}
            onClick={handleCancel}
          >
            {pending ? (
              <>
                <LoaderCircle className="mr-2 size-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              "Confirm Cancellation"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerCancelBookingButton;
