"use client";

import { useMemo } from "react";

interface TimeSlotPickerProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
}

export function TimeSlotPicker({
  selectedDate,
  selectedTime,
  setSelectedTime,
}: TimeSlotPickerProps) {
  const slots = useMemo(() => {
    if (!selectedDate) {
      return [];
    }

    // Temporary fixed slots
    // Later replace with API generated slots

    return ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];
  }, [selectedDate]);

  if (!selectedDate) {
    return (
      <div
        className="
          rounded-lg
          border
          bg-muted/30
          p-4
        "
      >
        <p className="text-sm text-muted-foreground">
          Please select a date first.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="mb-3 font-medium">Available Time Slots</h3>

      <div
        className="
          grid
          grid-cols-2
          gap-3
          sm:grid-cols-3
        "
      >
        {slots.map((slot) => (
          <button
            key={slot}
            type="button"
            onClick={() => setSelectedTime(slot)}
            className={`
                rounded-lg
                border
                px-4
                py-3
                text-sm
                font-medium
                transition

                ${
                  selectedTime === slot
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-white hover:border-primary hover:bg-primary/5"
                }

              `}
          >
            {formatTime(slot)}
          </button>
        ))}
      </div>
    </div>
  );
}

function formatTime(time: string) {
  const [hours, minutes] = time.split(":");

  const date = new Date();

  date.setHours(Number(hours));

  date.setMinutes(Number(minutes));

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}
