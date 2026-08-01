"use client";

import { useState, useTransition } from "react";
import {
  CalendarClock,
  Check,
  LoaderCircle,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { TechnicianAvailability } from "@/lib/type";

import { updateTechnicianAvailabilityAction } from "../../_actions/technicianAvailabilityActions";

type DaySchedule = {
  dayOfWeek: number;
  label: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
};

interface WeeklyAvailabilityFormProps {
  initialAvailability?: TechnicianAvailability[];
}

const weekDays = [
  {
    dayOfWeek: 0,
    label: "Sunday",
  },
  {
    dayOfWeek: 1,
    label: "Monday",
  },
  {
    dayOfWeek: 2,
    label: "Tuesday",
  },
  {
    dayOfWeek: 3,
    label: "Wednesday",
  },
  {
    dayOfWeek: 4,
    label: "Thursday",
  },
  {
    dayOfWeek: 5,
    label: "Friday",
  },
  {
    dayOfWeek: 6,
    label: "Saturday",
  },
];

const getTimeValue = (value?: string) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${String(date.getUTCHours()).padStart(
    2,
    "0",
  )}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
};

const createAvailabilityDateTime = (
  dayOfWeek: number,
  time: string,
) => {
  const [hours, minutes] = time.split(":").map(Number);

  // Sunday, January 4, 2026 is used as a stable reference week.
  const date = new Date(
    Date.UTC(
      2026,
      0,
      4 + dayOfWeek,
      hours,
      minutes,
      0,
      0,
    ),
  );

  return date.toISOString();
};

const createInitialSchedule = (
  availability: TechnicianAvailability[],
): DaySchedule[] => {
  return weekDays.map((day) => {
    const existingSlot = availability.find(
      (slot) => slot.dayOfWeek === day.dayOfWeek,
    );

    return {
      dayOfWeek: day.dayOfWeek,
      label: day.label,
      enabled: Boolean(existingSlot),
      startTime:
        getTimeValue(existingSlot?.startTime) || "09:00",
      endTime:
        getTimeValue(existingSlot?.endTime) || "17:00",
    };
  });
};

const WeeklyAvailabilityForm = ({
  initialAvailability = [],
}: WeeklyAvailabilityFormProps) => {
  const initialSchedule =
    createInitialSchedule(initialAvailability);

  const [schedule, setSchedule] =
    useState<DaySchedule[]>(initialSchedule);

  const [savedSchedule, setSavedSchedule] =
    useState<DaySchedule[]>(initialSchedule);

  const [pending, startTransition] = useTransition();

  const updateDay = (
    dayOfWeek: number,
    updates: Partial<DaySchedule>,
  ) => {
    setSchedule((currentSchedule) =>
      currentSchedule.map((day) =>
        day.dayOfWeek === dayOfWeek
          ? {
              ...day,
              ...updates,
            }
          : day,
      ),
    );
  };

  const handleReset = () => {
    setSchedule(savedSchedule);
  };

  const handleSave = () => {
    const activeDays = schedule.filter(
      (day) => day.enabled,
    );

    for (const day of activeDays) {
      if (!day.startTime || !day.endTime) {
        toast.error(
          `Select start and end times for ${day.label}`,
        );

        return;
      }

      if (day.startTime >= day.endTime) {
        toast.error(
          `${day.label}: end time must be after start time`,
        );

        return;
      }
    }

    const payload: TechnicianAvailability[] =
      activeDays.map((day) => ({
        dayOfWeek: day.dayOfWeek,
        startTime: createAvailabilityDateTime(
          day.dayOfWeek,
          day.startTime,
        ),
        endTime: createAvailabilityDateTime(
          day.dayOfWeek,
          day.endTime,
        ),
      }));

    startTransition(async () => {
      try {
        const result =
          await updateTechnicianAvailabilityAction(
            payload,
          );

        if (!result?.success) {
          toast.error(
            result?.message ||
              "Failed to update availability",
          );

          return;
        }

        const newSchedule = createInitialSchedule(
          result?.data ?? payload,
        );

        setSchedule(newSchedule);
        setSavedSchedule(newSchedule);

        toast.success(
          result?.message ||
            "Availability updated successfully",
        );
      } catch (error) {
        console.error(
          "Availability update error:",
          error,
        );

        toast.error(
          "Something went wrong while saving availability",
        );
      }
    });
  };

  const activeDayCount = schedule.filter(
    (day) => day.enabled,
  ).length;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <CalendarClock className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Weekly Working Hours
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enable working days and choose the hours
                customers can book.
              </p>
            </div>
          </div>

          <span className="w-fit rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            {activeDayCount} active{" "}
            {activeDayCount === 1 ? "day" : "days"}
          </span>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {schedule.map((day) => (
          <div
            key={day.dayOfWeek}
            className="grid grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-[180px_1fr] sm:items-center"
          >
            <div className="flex items-center gap-3">
              <Switch
                checked={day.enabled}
                disabled={pending}
                onCheckedChange={(checked) =>
                  updateDay(day.dayOfWeek, {
                    enabled: checked,
                  })
                }
              />

              <div>
                <p className="font-medium text-slate-900">
                  {day.label}
                </p>

                <p className="text-xs text-slate-500">
                  {day.enabled
                    ? "Available"
                    : "Unavailable"}
                </p>
              </div>
            </div>

            {day.enabled ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex-1 space-y-1.5">
                  <label
                    htmlFor={`start-${day.dayOfWeek}`}
                    className="text-xs font-medium text-slate-500"
                  >
                    Start time
                  </label>

                  <input
                    id={`start-${day.dayOfWeek}`}
                    type="time"
                    value={day.startTime}
                    disabled={pending}
                    onChange={(event) =>
                      updateDay(day.dayOfWeek, {
                        startTime: event.target.value,
                      })
                    }
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <span className="mt-5 hidden text-slate-400 sm:block">
                  to
                </span>

                <div className="flex-1 space-y-1.5">
                  <label
                    htmlFor={`end-${day.dayOfWeek}`}
                    className="text-xs font-medium text-slate-500"
                  >
                    End time
                  </label>

                  <input
                    id={`end-${day.dayOfWeek}`}
                    type="time"
                    value={day.endTime}
                    disabled={pending}
                    onChange={(event) =>
                      updateDay(day.dayOfWeek, {
                        endTime: event.target.value,
                      })
                    }
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                Customers cannot book this day.
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={pending}
          onClick={handleReset}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>

        <Button
          type="button"
          disabled={pending}
          onClick={handleSave}
        >
          {pending ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Save Availability
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default WeeklyAvailabilityForm;