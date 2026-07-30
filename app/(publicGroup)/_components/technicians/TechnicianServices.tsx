/* eslint-disable @typescript-eslint/no-explicit-any */
// _components/technicians/TechnicianServices.tsx

"use client";

import { useState } from "react";
import { BookingModal } from "./BookingModal";

export function TechnicianServices({ services, technician }: any) {
  const [selectedService, setSelectedService] = useState<any>(null);

  return (
    <div>
      <h2 className="mb-5 text-2xl font-bold">Services Offered</h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service: any) => (
          <div key={service.id} className="rounded-xl border p-5 shadow-sm">
            <h3 className="font-bold">{service.title}</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {service.category.name}
            </p>

            <p className="mt-3 font-bold">৳{service.price}</p>

            <button
              onClick={() => setSelectedService(service)}
              className="mt-5 w-full rounded-xl bg-primary px-4 py-3 text-white"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {selectedService && (
        <BookingModal
          service={selectedService}
          technician={technician}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}
