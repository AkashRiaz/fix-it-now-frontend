"use client";

import { FormEvent, useState, useTransition } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Booking } from "./bookingTable";
import { createReviewAction } from "../../_actions/reviewActions";

interface ReviewModalProps {
  open: boolean;
  booking: Booking | null;
  onClose: () => void;
}

const ReviewModal = ({ open, booking, onClose }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const [isPending, startTransition] = useTransition();

  const resetForm = () => {
    setRating(0);
    setHoveredRating(0);
  };

  const handleClose = () => {
    if (isPending) return;

    resetForm();
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!booking) {
      toast.error("Booking information is missing.");
      return;
    }

    if (rating < 1 || rating > 5) {
      toast.error("Please select a rating.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    formData.set("bookingId", booking.id);
    formData.set("rating", rating.toString());

    startTransition(async () => {
      try {
        const result = await createReviewAction(formData);

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success(result.message);
        resetForm();
        onClose();
      } catch (error) {
        console.error("Review submission error:", error);

        toast.error("Failed to submit review.");
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          handleClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review your service</DialogTitle>

          <DialogDescription>
            Share your experience with{" "}
            {booking?.technician?.user?.name || "the technician"}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="hidden" name="bookingId" value={booking?.id || ""} />

          <input type="hidden" name="rating" value={rating} />

          <div className="space-y-2">
            <Label>Rating</Label>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((value) => {
                const isActive = value <= (hoveredRating || rating);

                return (
                  <button
                    key={value}
                    type="button"
                    disabled={isPending}
                    onMouseEnter={() => setHoveredRating(value)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(value)}
                    className="rounded-sm p-1 transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                  >
                    <Star
                      className={`h-7 w-7 ${
                        isActive
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>

            <Textarea
              id="comment"
              name="comment"
              disabled={isPending}
              placeholder="Describe your experience..."
              rows={5}
              maxLength={1000}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={handleClose}
            >
              Close
            </Button>

            <Button type="submit" disabled={isPending || rating === 0}>
              {isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
