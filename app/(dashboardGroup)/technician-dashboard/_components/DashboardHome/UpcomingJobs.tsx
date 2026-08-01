import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardBooking } from "@/lib/type";

type UpcomingJobsProps = {
  bookings?: DashboardBooking[];
};

const UpcomingJobs = ({
  bookings = [],
}: UpcomingJobsProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Upcoming Jobs
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your accepted, paid and active bookings.
          </p>
        </div>

        <Button asChild variant="outline" size="sm">
          <Link href="/technician-dashboard/technician/bookings">
            View All
          </Link>
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        {bookings?.length > 0 ? (
          bookings.slice(0, 5).map((booking) => {
            const bookingDate = new Date(
              booking?.bookingDate,
            );

            return (
              <div
                key={booking?.id}
                className="rounded-xl border border-slate-200 p-4 transition hover:border-primary/30 hover:bg-slate-50"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {booking?.service?.title ||
                        "Unknown service"}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <UserRound className="h-4 w-4" />

                        {booking?.customer?.name ||
                          "Unknown customer"}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4" />

                        {!Number.isNaN(
                          bookingDate.getTime(),
                        )
                          ? bookingDate.toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "Invalid date"}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Clock3 className="h-4 w-4" />

                        {!Number.isNaN(
                          bookingDate.getTime(),
                        )
                          ? bookingDate.toLocaleTimeString(
                              "en-US",
                              {
                                hour: "numeric",
                                minute: "2-digit",
                              },
                            )
                          : "Invalid time"}
                      </span>

                      {booking?.customerAddress && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />

                          {booking.customerAddress}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                      {booking?.status?.replaceAll(
                        "_",
                        " ",
                      ) || "UNKNOWN"}
                    </span>

                    <span className="font-bold text-slate-900">
                      $
                      {Number(
                        booking?.totalPrice ?? 0,
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-10 text-center">
            <Clock3 className="mx-auto h-8 w-8 text-slate-300" />

            <h3 className="mt-3 font-semibold text-slate-800">
              No upcoming jobs
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Your next scheduled jobs will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingJobs;