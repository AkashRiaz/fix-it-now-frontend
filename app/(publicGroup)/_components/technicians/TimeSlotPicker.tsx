"use client";

import { useMemo } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import type {
  TechnicianAvailability,
} from "@/lib/type";

interface TimeSlotPickerProps {
  selectedDate?: Date;
  availability?: TechnicianAvailability[];
  selectedStartTime: string;
  selectedEndTime: string;
  onStartTimeChange: (
    time: string,
  ) => void;
  onEndTimeChange: (
    time: string,
  ) => void;
  disabled?: boolean;
}

const SLOT_INTERVAL_MINUTES = 30;

const getMinutesFromDate = (
  value: string,
) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return (
    date.getUTCHours() * 60 +
    date.getUTCMinutes()
  );
};

const minutesToTimeValue = (
  totalMinutes: number,
) => {
  const hours = Math.floor(
    totalMinutes / 60,
  );

  const minutes =
    totalMinutes % 60;

  return `${String(hours).padStart(
    2,
    "0",
  )}:${String(minutes).padStart(
    2,
    "0",
  )}`;
};

const timeValueToMinutes = (
  value: string,
) => {
  const [hours, minutes] = value
    .split(":")
    .map(Number);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return null;
  }

  return hours * 60 + minutes;
};

const formatTime = (
  value: string,
) => {
  const totalMinutes =
    timeValueToMinutes(value);

  if (totalMinutes === null) {
    return value;
  }

  const hours = Math.floor(
    totalMinutes / 60,
  );

  const minutes =
    totalMinutes % 60;

  const suffix =
    hours >= 12 ? "PM" : "AM";

  const displayHour =
    hours % 12 || 12;

  return `${displayHour}:${String(
    minutes,
  ).padStart(2, "0")} ${suffix}`;
};

const generateTimeSlots = (
  startMinutes: number,
  endMinutes: number,
) => {
  const times: string[] = [];

  for (
    let current = startMinutes;
    current <= endMinutes;
    current += SLOT_INTERVAL_MINUTES
  ) {
    times.push(
      minutesToTimeValue(current),
    );
  }

  return times;
};

export function TimeSlotPicker({
  selectedDate,
  availability = [],
  selectedStartTime,
  selectedEndTime,
  onStartTimeChange,
  onEndTimeChange,
  disabled = false,
}: TimeSlotPickerProps) {
  const dayAvailability = useMemo(() => {
    if (!selectedDate) {
      return [];
    }

    const dayOfWeek =
      selectedDate.getDay();

    return availability.filter(
      (item) =>
        item.dayOfWeek === dayOfWeek,
    );
  }, [
    selectedDate,
    availability,
  ]);

  const startTimeOptions =
    useMemo(() => {
      const values =
        dayAvailability.flatMap(
          (item) => {
            const startMinutes =
              getMinutesFromDate(
                item.startTime,
              );

            const endMinutes =
              getMinutesFromDate(
                item.endTime,
              );

            if (
              startMinutes === null ||
              endMinutes === null ||
              startMinutes >= endMinutes
            ) {
              return [];
            }

            return generateTimeSlots(
              startMinutes,
              endMinutes -
                SLOT_INTERVAL_MINUTES,
            );
          },
        );

      return Array.from(
        new Set(values),
      ).sort();
    }, [dayAvailability]);

  const endTimeOptions =
    useMemo(() => {
      if (!selectedStartTime) {
        return [];
      }

      const selectedStartMinutes =
        timeValueToMinutes(
          selectedStartTime,
        );

      if (
        selectedStartMinutes === null
      ) {
        return [];
      }

      const matchingAvailability =
        dayAvailability.find(
          (item) => {
            const startMinutes =
              getMinutesFromDate(
                item.startTime,
              );

            const endMinutes =
              getMinutesFromDate(
                item.endTime,
              );

            if (
              startMinutes === null ||
              endMinutes === null
            ) {
              return false;
            }

            return (
              selectedStartMinutes >=
                startMinutes &&
              selectedStartMinutes <
                endMinutes
            );
          },
        );

      if (!matchingAvailability) {
        return [];
      }

      const availabilityEndMinutes =
        getMinutesFromDate(
          matchingAvailability.endTime,
        );

      if (
        availabilityEndMinutes === null
      ) {
        return [];
      }

      return generateTimeSlots(
        selectedStartMinutes +
          SLOT_INTERVAL_MINUTES,
        availabilityEndMinutes,
      );
    }, [
      selectedStartTime,
      dayAvailability,
    ]);

  const availabilityLabel =
    useMemo(() => {
      return dayAvailability
        .map((item) => {
          const startMinutes =
            getMinutesFromDate(
              item.startTime,
            );

          const endMinutes =
            getMinutesFromDate(
              item.endTime,
            );

          if (
            startMinutes === null ||
            endMinutes === null
          ) {
            return null;
          }

          return `${formatTime(
            minutesToTimeValue(
              startMinutes,
            ),
          )} – ${formatTime(
            minutesToTimeValue(
              endMinutes,
            ),
          )}`;
        })
        .filter(Boolean)
        .join(", ");
    }, [dayAvailability]);

  if (!selectedDate) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white p-2 text-slate-400 shadow-sm">
            <Clock3 className="size-5" />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700">
              Select a service date
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              Available time slots
              will appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!dayAvailability.length) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-500" />

          <div>
            <p className="text-sm font-semibold text-red-700">
              Technician unavailable
            </p>

            <p className="mt-1 text-xs leading-5 text-red-600">
              This technician has no
              working schedule on the
              selected day. Choose
              another date.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />

        <div>
          <p className="text-sm font-semibold text-emerald-800">
            Technician availability
          </p>

          <p className="mt-1 text-sm text-emerald-700">
            {availabilityLabel}
          </p>

          <p className="mt-1 text-xs text-emerald-600">
            Times are available in
            30-minute intervals.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="startTime"
            className="text-sm font-medium text-slate-800"
          >
            Start time
          </label>

          <select
            id="startTime"
            value={
              selectedStartTime
            }
            disabled={
              disabled ||
              !startTimeOptions.length
            }
            onChange={(event) => {
              onStartTimeChange(
                event.target.value,
              );

              onEndTimeChange("");
            }}
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">
              Select start time
            </option>

            {startTimeOptions.map(
              (time) => (
                <option
                  key={time}
                  value={time}
                >
                  {formatTime(time)}
                </option>
              ),
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="endTime"
            className="text-sm font-medium text-slate-800"
          >
            End time
          </label>

          <select
            id="endTime"
            value={selectedEndTime}
            disabled={
              disabled ||
              !selectedStartTime ||
              !endTimeOptions.length
            }
            onChange={(event) =>
              onEndTimeChange(
                event.target.value,
              )
            }
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">
              Select end time
            </option>

            {endTimeOptions.map(
              (time) => (
                <option
                  key={time}
                  value={time}
                >
                  {formatTime(time)}
                </option>
              ),
            )}
          </select>
        </div>
      </div>
    </div>
  );
}