import { BookingStatusSummary } from "@/lib/type";
import {
  BadgeCheck,
  Ban,
  CheckCircle2,
  Clock3,
  CreditCard,
  LoaderCircle,
  XCircle,
} from "lucide-react";


type BookingStatusOverviewProps = {
  summary?: BookingStatusSummary | null;
};

const BookingStatusOverview = ({
  summary,
}: BookingStatusOverviewProps) => {
  const statuses = [
    {
      label: "Requested",
      value: summary?.requested ?? 0,
      icon: Clock3,
      style: "bg-amber-50 text-amber-700",
    },
    {
      label: "Accepted",
      value: summary?.accepted ?? 0,
      icon: BadgeCheck,
      style: "bg-blue-50 text-blue-700",
    },
    {
      label: "Paid",
      value: summary?.paid ?? 0,
      icon: CreditCard,
      style: "bg-purple-50 text-purple-700",
    },
    {
      label: "In Progress",
      value: summary?.inProgress ?? 0,
      icon: LoaderCircle,
      style: "bg-cyan-50 text-cyan-700",
    },
    {
      label: "Completed",
      value: summary?.completed ?? 0,
      icon: CheckCircle2,
      style: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Cancelled",
      value: summary?.cancelled ?? 0,
      icon: Ban,
      style: "bg-slate-100 text-slate-700",
    },
    {
      label: "Declined",
      value: summary?.declined ?? 0,
      icon: XCircle,
      style: "bg-rose-50 text-rose-700",
    },
  ];

  const totalBookings = statuses.reduce(
    (total, item) => total + item.value,
    0,
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Booking Status Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Current booking distribution across the platform.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {statuses.map((status) => {
          const Icon = status.icon;

          const percentage =
            totalBookings > 0
              ? Math.round((status.value / totalBookings) * 100)
              : 0;

          return (
            <article
              key={status.label}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className={`rounded-lg p-2 ${status.style}`}>
                  <Icon className="h-4 w-4" />
                </div>

                <span className="text-xs text-slate-400">
                  {percentage}%
                </span>
              </div>

              <p className="mt-4 text-2xl font-bold text-slate-900">
                {status.value}
              </p>

              <p className="mt-1 text-xs font-medium text-slate-500">
                {status.label}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default BookingStatusOverview;