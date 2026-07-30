"use client";

import { useState } from "react";
import { TimeSlotPicker } from "./TimeSlotPicker";
import { createBookingAction } from "../../_actions/bookingActions";

interface BookingModalProps {
  service: any;
  technician: any;
  onClose: () => void;
}

export function BookingModal({
  service,
  technician,
  onClose,
}: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [notes, setNotes] = useState("");

  const [address, setAddress] = useState("");

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your address");
      return;
    }

    const [hours, minutes] = selectedTime.split(":").map(Number);

    const bookingDate = new Date(selectedDate);

    bookingDate.setHours(hours, minutes, 0, 0);

    const payload = {
      bookingDate: bookingDate.toISOString(),

      notes,

      customerAddress: address,

      serviceId: service.id,

      technicianId: technician.id,
    };

    console.log("Booking payload:", payload);

    // Later:
    await createBookingAction(payload);

    onClose();
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
    >
      <div
        className="
          max-h-[90vh]
          w-full
          max-w-2xl
          overflow-y-auto
          rounded-2xl
          bg-white
          p-6
        "
      >
        {/* Header */}

        <div
          className="
            mb-6
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2
              className="
                text-2xl
                font-bold
              "
            >
              Book Service
            </h2>

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              {service.title}
            </p>

            <p
              className="
                mt-1
                text-sm
                text-muted-foreground
              "
            >
              Technician: {technician.user?.name}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              px-3
              py-2
              hover:bg-gray-100
            "
          >
            ✕
          </button>
        </div>

        {/* Date */}

        <div>
          <label
            className="
              mb-2
              block
              font-medium
            "
          >
            Select Date
          </label>

          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="
              w-full
              rounded-lg
              border
              p-3
            "
            onChange={(e) => {
              const value = e.target.value;

              if (!value) {
                setSelectedDate(null);

                setSelectedTime(null);

                return;
              }

              setSelectedDate(new Date(`${value}T00:00:00`));

              setSelectedTime(null);
            }}
          />
        </div>

        {/* Time */}

        <div className="mt-6">
          <label
            className="
              mb-2
              block
              font-medium
            "
          >
            Select Time
          </label>

          <TimeSlotPicker
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </div>

        {/* Address */}

        <div className="mt-6">
          <label
            className="
              mb-2
              block
              font-medium
            "
          >
            Service Address
          </label>

          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="
              Enter your service address
            "
            className="
              min-h-24
              w-full
              rounded-lg
              border
              p-3
            "
          />
        </div>

        {/* Notes */}

        <div className="mt-4">
          <label
            className="
              mb-2
              block
              font-medium
            "
          >
            Notes
          </label>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="
              Describe your problem...
            "
            className="
              min-h-24
              w-full
              rounded-lg
              border
              p-3
            "
          />
        </div>

        {/* Confirm */}

        <button
          type="button"
          onClick={handleBooking}
          className="
            mt-6
            w-full
            rounded-xl
            bg-primary
            px-6
            py-3
            font-medium
            text-white
          "
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
