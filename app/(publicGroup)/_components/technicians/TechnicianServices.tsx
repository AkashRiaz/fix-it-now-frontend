/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  CalendarX2,
  Clock3,
  Tag,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookingModal } from "./BookingModal";

export function TechnicianServices({
  services = [],
  technician,
}: any) {
  const [selectedService, setSelectedService] =
    useState<any>(null);

  const [bookingOpen, setBookingOpen] =
    useState(false);

    // console.log("technician-------------------->>>>", technician);

  const hasAvailability =
    Array.isArray(technician?.availability) &&
    technician.availability.length > 0;

  const handleOpenBooking = (service: any) => {
    if (!hasAvailability) {
      return;
    }

    setSelectedService(service);
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
    setSelectedService(null);
  };

  if (!services.length) {
    return (
      <section>
        <h2 className="mb-5 text-2xl font-bold text-slate-900">
          Services Offered
        </h2>

        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
          <Wrench className="mx-auto h-10 w-10 text-slate-300" />

          <h3 className="mt-4 font-semibold text-slate-900">
            No services available
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            This technician has not added any services yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900">
          Services Offered
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Choose a service and select an available booking slot.
        </p>
      </div>

      {!hasAvailability && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <CalendarX2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

          <div>
            <p className="text-sm font-semibold text-amber-800">
              Booking is currently unavailable
            </p>

            <p className="mt-1 text-sm text-amber-700">
              This technician has not added a working schedule yet.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service: any) => (
          <article
            key={service.id}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <Wrench className="h-5 w-5" />
              </div>

              {service.isFeatured && (
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                  Featured
                </span>
              )}
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              {service.title}
            </h3>

            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <Tag className="h-4 w-4 text-primary" />

              <span>
                {service.category?.name || "Uncategorized"}
              </span>
            </div>

            <p className="mt-3 line-clamp-3 min-h-[66px] text-sm leading-6 text-slate-600">
              {service.description ||
                "No service description has been provided."}
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <Clock3 className="h-4 w-4 text-primary" />

              <span>
                {service.duration
                  ? `${service.duration} minutes`
                  : "Duration not specified"}
              </span>
            </div>

            <div className="mt-auto pt-5">
              <div className="mb-4 flex items-end justify-between rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="text-xs text-slate-500">
                    Service price
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    $
                    {Number(
                      service.price || 0,
                    ).toLocaleString()}
                  </p>
                </div>

                <span className="text-xs text-slate-500">
                  Starting price
                </span>
              </div>

              <Button
                type="button"
                className="w-full"
                disabled={!hasAvailability}
                onClick={() =>
                  handleOpenBooking(service)
                }
              >
                {hasAvailability
                  ? "Book Service"
                  : "No Availability"}
              </Button>
            </div>
          </article>
        ))}
      </div>

      {bookingOpen &&
        selectedService &&
        hasAvailability && (
          <BookingModal
            open={bookingOpen}
            service={selectedService}
            technician={technician}
            onClose={handleCloseBooking}
          />
        )}
    </section>
  );
}