"use client";

import { useState } from "react";
import { CalendarCheck, Clock, MapPin, Star, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IService } from "@/lib/type";
import { BookingModal } from "../technicians/BookingModal";

export function ServiceCard({ service }: { service: IService }) {
  const [bookingOpen, setBookingOpen] = useState(false);

  const technician = service?.technician;

  const technicianName = technician?.user?.name || "Unknown Technician";

  const initials =
    technicianName
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "T";

  const rating = Number(technician?.averageRating || 0).toFixed(1);

  const handleOpenBooking = () => {
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
  };

  return (
    <>
      <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Category and rating */}
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {service?.category?.name || "Uncategorized"}
          </span>

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

            <span className="text-sm font-semibold text-slate-800">
              {rating}
            </span>
          </div>
        </div>

        {/* Service title */}
        <h3 className="mt-5 text-xl font-bold text-slate-900">
          {service?.title || "Untitled Service"}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-3 min-h-[66px] text-sm leading-6 text-muted-foreground">
          {service?.description || "No service description has been provided."}
        </p>

        {/* Technician information */}
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm text-slate-600">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {initials}
            </div>

            <div className="min-w-0">
              <p className="text-xs text-slate-500">Technician</p>

              <p className="truncate font-medium text-slate-800">
                {technicianName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />

            <span>{technician?.location || "Location not provided"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />

            <span>
              {service?.duration
                ? `${service.duration} minutes`
                : "Duration not specified"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <UserRound className="h-4 w-4 text-primary" />

            <span>{technician?.completedJobs || 0} completed jobs</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6">
          <div className="mb-4 flex items-end justify-between rounded-xl bg-slate-50 p-4">
            <div>
              <p className="text-xs text-muted-foreground">Service price</p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                ${Number(service?.price || 0).toLocaleString()}
              </p>
            </div>

            <span className="text-xs text-slate-500">Starting price</span>
          </div>

          <Button
            type="button"
            className="w-full"
            disabled={!technician}
            onClick={handleOpenBooking}
          >
            <CalendarCheck className="mr-2 h-4 w-4" />
            Book Service
          </Button>
        </div>
      </article>

      {bookingOpen && technician && (
        <BookingModal
          open={bookingOpen}
          service={service}
          technician={technician}
          onClose={handleCloseBooking}
        />
      )}
    </>
  );
}
