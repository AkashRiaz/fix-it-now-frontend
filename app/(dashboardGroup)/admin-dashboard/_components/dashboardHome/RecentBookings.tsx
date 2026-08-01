import { RecentBooking } from "@/lib/type";
import {
  CalendarDays,
  UserRound,
  Wrench,
} from "lucide-react";


type RecentBookingsProps = {
  bookings?: RecentBooking[];
};

const statusStyles: Record<string, string> = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  REQUESTED: "border-amber-200 bg-amber-50 text-amber-700",
  ACCEPTED: "border-blue-200 bg-blue-50 text-blue-700",
  PAID: "border-purple-200 bg-purple-50 text-purple-700",
  IN_PROGRESS:
    "border-cyan-200 bg-cyan-50 text-cyan-700",
  COMPLETED:
    "border-emerald-200 bg-emerald-50 text-emerald-700",
  CANCELLED:
    "border-slate-200 bg-slate-100 text-slate-700",
  DECLINED: "border-rose-200 bg-rose-50 text-rose-700",
};

const formatDate = (value?: string | null) => {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const RecentBookings = ({
  bookings = [],
}: RecentBookingsProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Bookings
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest booking activity across the platform.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {bookings?.length > 0 ? (
          bookings.map((booking) => (
            <article
              key={booking?.id}
              className="rounded-xl border border-slate-200 p-4 transition hover:border-primary/30 hover:bg-slate-50"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-slate-900">
                    {booking?.service?.title ||
                      "Unknown service"}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <UserRound className="h-3.5 w-3.5" />

                      Customer:{" "}
                      {booking?.customer?.name || "Unknown"}
                    </span>

                    <span className="flex items-center gap-1">
                      <Wrench className="h-3.5 w-3.5" />

                      Technician:{" "}
                      {booking?.technician?.user?.name ||
                        "Unassigned"}
                    </span>

                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />

                      {formatDate(booking?.bookingDate)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end">
                  <p className="font-bold text-slate-900">
                    $
                    {Number(
                      booking?.totalPrice ?? 0,
                    ).toLocaleString()}
                  </p>

                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                      statusStyles[
                        booking?.status || "PENDING"
                      ] ||
                      "border-slate-200 bg-slate-100 text-slate-700"
                    }`}
                  >
                    {booking?.status?.replaceAll("_", " ") ||
                      "UNKNOWN"}
                  </span>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
            <p className="text-sm text-slate-500">
              No recent bookings found.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentBookings;