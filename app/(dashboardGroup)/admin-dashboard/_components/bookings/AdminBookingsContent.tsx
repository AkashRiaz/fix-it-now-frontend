import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
} from "lucide-react";

import { getAdminBookingsAction } from "../../_actions/adminBookingActions";
import AdminBookingsTable from "./AdminBookingsTable";
const AdminBookingsContent = async () => {
  const result = await getAdminBookingsAction();

  if (!result?.success) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100">
          <AlertCircle className="size-6 text-red-600" />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-red-800">
          Unable to load bookings
        </h2>

        <p className="mt-1 text-sm text-red-600">
          {result?.message || "Something went wrong."}
        </p>
      </div>
    );
  }

  const bookings = result?.data ?? [];

  const requestedBookings = bookings.filter(
    (booking) => booking.status === "REQUESTED",
  ).length;

  const activeBookings = bookings.filter((booking) =>
    ["ACCEPTED", "IN_PROGRESS"].includes(booking.status),
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.status === "COMPLETED",
  ).length;

  const completedRevenue = bookings
    .filter((booking) => booking.status === "COMPLETED")
    .reduce((total, booking) => total + Number(booking.totalPrice || 0), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Total Bookings"
          value={bookings.length.toLocaleString()}
          description="All platform bookings"
          icon={<CalendarClock className="size-5" />}
        />

        <SummaryCard
          label="Pending Requests"
          value={requestedBookings.toLocaleString()}
          description="Awaiting technician response"
          icon={<Clock3 className="size-5" />}
        />

        <SummaryCard
          label="Active Bookings"
          value={activeBookings.toLocaleString()}
          description="Accepted or in progress"
          icon={<CheckCircle2 className="size-5" />}
        />

        <SummaryCard
          label="Completed Revenue"
          value={`$${completedRevenue.toLocaleString()}`}
          description={`${completedBookings} completed bookings`}
          icon={<CircleDollarSign className="size-5" />}
        />
      </div>

      <AdminBookingsTable bookings={bookings} />
    </div>
  );
};

type SummaryCardProps = {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
};

const SummaryCard = ({ label, value, description, icon }: SummaryCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>

          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>

        <div className="rounded-xl bg-primary/10 p-3 text-primary">{icon}</div>
      </div>
    </div>
  );
};

export default AdminBookingsContent;
