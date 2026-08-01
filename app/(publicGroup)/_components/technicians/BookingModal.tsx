"use client";

import Image from "next/image";
import { useMemo, useState, useTransition } from "react";
import { format } from "date-fns";
import {
  CalendarDays,
  ChevronDown,
  Clock3,
  LoaderCircle,
  MapPin,
  NotebookPen,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

import { createBookingAction } from "../../_actions/bookingActions";
import { TimeSlotPicker } from "./TimeSlotPicker";
import {
  BookingService,
  BookingTechnician,
  CreateBookingPayload,
} from "@/lib/type";

interface BookingModalProps {
  service: BookingService;
  technician: BookingTechnician;
  open?: boolean;
  onClose: () => void;
}

const combineDateAndTime = (selectedDate: Date, timeValue: string) => {
  const [hours, minutes] = timeValue.split(":").map(Number);

  const result = new Date(selectedDate);

  result.setHours(hours, minutes, 0, 0);

  return result;
};

const formatTime = (value: string) => {
  const [hours, minutes] = value.split(":").map(Number);

  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

export function BookingModal({
  service,
  technician,
  open = true,
  onClose,
}: BookingModalProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const [selectedStartTime, setSelectedStartTime] = useState("");

  const [selectedEndTime, setSelectedEndTime] = useState("");

  const [notes, setNotes] = useState("");
  const [address, setAddress] = useState("");

  const [pending, startTransition] = useTransition();

  const technicianName = technician?.user?.name || "Assigned Technician";

  const technicianInitials =
    technicianName
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "T";

  const selectedSlotSummary = useMemo(() => {
    if (!selectedDate || !selectedStartTime || !selectedEndTime) {
      return null;
    }

    return {
      date: format(selectedDate, "EEEE, MMMM d, yyyy"),
      startTime: formatTime(selectedStartTime),
      endTime: formatTime(selectedEndTime),
    };
  }, [selectedDate, selectedStartTime, selectedEndTime]);

  const resetForm = () => {
    setSelectedDate(undefined);
    setSelectedStartTime("");
    setSelectedEndTime("");
    setNotes("");
    setAddress("");
    setCalendarOpen(false);
  };

  const handleClose = () => {
    if (pending) return;

    resetForm();
    onClose();
  };

  const handleBooking = () => {
    if (!selectedDate) {
      toast.error("Please select a service date");
      return;
    }

    if (!selectedStartTime || !selectedEndTime) {
      toast.error("Please select the booking start and end time");
      return;
    }

    if (!address.trim()) {
      toast.error("Please enter the service address");
      return;
    }

    const slotStart = combineDateAndTime(selectedDate, selectedStartTime);

    const slotEnd = combineDateAndTime(selectedDate, selectedEndTime);

    if (slotStart >= slotEnd) {
      toast.error("End time must be after start time");
      return;
    }

    if (slotStart <= new Date()) {
      toast.error("The booking time must be in the future");
      return;
    }

    const payload: CreateBookingPayload = {
      slotStart: slotStart.toISOString(),
      slotEnd: slotEnd.toISOString(),
      notes: notes.trim() || undefined,
      customerAddress: address.trim(),
      serviceId: service.id,
    };

    startTransition(async () => {
      const result = await createBookingAction(payload);

      if (!result?.success) {
        toast.error(result?.message || "Failed to create booking");

        return;
      }

      toast.success(
        result?.message || "Booking request submitted successfully",
      );

      resetForm();
      onClose();
    });
  };

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          handleClose();
        }
      }}
    >
      <DialogContent className="max-h-[92vh] overflow-y-auto p-0 sm:max-w-2xl">
        <DialogHeader className="border-b bg-slate-50 px-6 py-5 text-left">
          <div className="flex items-start justify-between gap-4 pr-8">
            <div>
              <DialogTitle className="text-2xl">Book Service</DialogTitle>

              <DialogDescription className="mt-1">
                Choose a date and available booking time.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 px-6 pb-6">
          {/* Service information */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <Wrench className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Selected service
                </p>

                <h3 className="mt-1 font-semibold text-slate-900">
                  {service.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span>${Number(service.price || 0).toLocaleString()}</span>

                  <span className="flex items-center gap-1">
                    <Clock3 className="size-3.5" />
                    {service.duration} minutes
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Technician information */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-bold text-primary">
              {technician?.profilePhoto ? (
                <Image
                  src={technician.profilePhoto}
                  alt={technicianName}
                  fill
                  sizes="48px"
                  unoptimized
                  className="object-cover"
                />
              ) : (
                technicianInitials
              )}
            </div>

            <div>
              <p className="text-xs text-slate-500">Technician</p>

              <p className="font-semibold text-slate-900">{technicianName}</p>
            </div>
          </div>

          {/* Date picker */}
          <div className="space-y-2">
            <Label>
              <CalendarDays className="mr-1 inline size-4" />
              Service date
            </Label>

            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={pending}
                  className="h-11 w-full justify-between font-normal"
                >
                  <span className="flex items-center gap-2">
                    <CalendarDays className="size-4 text-muted-foreground" />

                    {selectedDate
                      ? format(selectedDate, "EEEE, MMMM d, yyyy")
                      : "Choose a service date"}
                  </span>

                  <ChevronDown className="size-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>

              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setSelectedStartTime("");
                    setSelectedEndTime("");

                    if (date) {
                      setCalendarOpen(false);
                    }
                  }}
                  disabled={{
                    before: new Date(),
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time selection */}
          <div className="space-y-2">
            <Label>
              <Clock3 className="mr-1 inline size-4" />
              Booking time
            </Label>

            <TimeSlotPicker
              selectedDate={selectedDate}
              availability={technician?.availability ?? []}
              selectedStartTime={selectedStartTime}
              selectedEndTime={selectedEndTime}
              onStartTimeChange={setSelectedStartTime}
              onEndTimeChange={setSelectedEndTime}
              disabled={pending}
            />
          </div>

          {/* Selected summary */}
          {selectedSlotSummary && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Selected booking slot
              </p>

              <p className="mt-1 text-sm text-slate-600">
                {selectedSlotSummary.date}
              </p>

              <p className="mt-1 flex items-center gap-2 text-sm font-medium text-primary">
                <Clock3 className="size-4" />

                {selectedSlotSummary.startTime}
                {" – "}
                {selectedSlotSummary.endTime}
              </p>
            </div>
          )}

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="customerAddress">
              <MapPin className="mr-1 inline size-4" />
              Service address
            </Label>

            <Textarea
              id="customerAddress"
              value={address}
              disabled={pending}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Enter the complete service address"
              className="min-h-24 resize-none"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="bookingNotes">
              <NotebookPen className="mr-1 inline size-4" />
              Additional notes
            </Label>

            <Textarea
              id="bookingNotes"
              value={notes}
              disabled={pending}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Describe the issue or add instructions for the technician"
              className="min-h-24 resize-none"
              maxLength={1000}
            />

            <p className="text-right text-xs text-slate-400">
              {notes.length}/1000
            </p>
          </div>

          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={pending}
              onClick={handleClose}
            >
              Cancel
            </Button>

            <Button
              type="button"
              disabled={
                pending ||
                !selectedDate ||
                !selectedStartTime ||
                !selectedEndTime ||
                !address.trim()
              }
              onClick={handleBooking}
              className="min-w-44"
            >
              {pending ? (
                <>
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
