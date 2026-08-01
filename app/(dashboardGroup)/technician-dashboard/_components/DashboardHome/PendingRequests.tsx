import Link from "next/link";
import { CalendarDays, ClipboardClock, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardBooking } from "@/lib/type";

type PendingRequestsProps = {
  bookings?: DashboardBooking[];
};

const PendingRequests = ({ bookings = [] }: PendingRequestsProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Pending Requests
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Requests waiting for your decision.
          </p>
        </div>

        <Button asChild variant="outline" size="sm">
          <Link href="/technician-dashboard/technician/bookings">Manage</Link>
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {bookings?.length > 0 ? (
          bookings.slice(0, 5).map((booking) => {
            const bookingDate = new Date(booking?.bookingDate);

            return (
              <div
                key={booking?.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <h3 className="font-semibold text-slate-900">
                  {booking?.service?.title || "Unknown service"}
                </h3>

                <div className="mt-2 space-y-2 text-xs text-slate-500">
                  <p className="flex items-center gap-1.5">
                    <UserRound className="h-3.5 w-3.5" />

                    {booking?.customer?.name || "Unknown customer"}
                  </p>

                  <p className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />

                    {!Number.isNaN(bookingDate.getTime())
                      ? bookingDate.toLocaleDateString()
                      : "Invalid date"}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="font-semibold text-slate-900">
                    ৳{Number(booking?.totalPrice ?? 0).toLocaleString()}
                  </span>

                  <Button asChild size="sm">
                    <Link href="/technician-dashboard/technician/bookings">
                      Review
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center">
            <ClipboardClock className="mx-auto h-8 w-8 text-slate-300" />

            <h3 className="mt-3 font-semibold text-slate-800">
              No pending requests
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              New customer requests will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PendingRequests;
