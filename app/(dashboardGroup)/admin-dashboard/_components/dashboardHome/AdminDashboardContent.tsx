import {
  AlertCircle,
  LayoutDashboard,
} from "lucide-react";

import { getAdminDashboardAction } from "../../_actions/adminDashboardActions";
import AdminSummaryCards from "./AdminSummaryCards";
import BookingStatusOverview from "./BookingStatusOverview";
import PaymentHealthCards from "./PaymentHealthCards";
import RecentBookings from "./RecentBookings";
import RecentPayments from "./RecentPayments";
import TopTechnicians from "./TopTechnicians";

const AdminDashboardContent = async () => {
  const result = await getAdminDashboardAction();

  if (!result?.success) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-red-800">
            Admin dashboard unavailable
          </h2>

          <p className="mt-1 text-sm text-red-600">
            {result?.message ||
              "Unable to retrieve platform information."}
          </p>
        </div>
      </main>
    );
  }

  const summary = result?.data?.summary;

  const bookingStatusSummary =
    result?.data?.bookingStatusSummary;

  const paymentSummary =
    result?.data?.paymentSummary;

  const recentBookings =
    result?.data?.recentBookings ?? [];

  const recentPayments =
    result?.data?.recentPayments ?? [];

  const topTechnicians =
    result?.data?.topTechnicians ?? [];

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          <LayoutDashboard className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor users, bookings, payments, revenue and platform performance.
          </p>
        </div>
      </div>

      <AdminSummaryCards summary={summary} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <BookingStatusOverview summary={bookingStatusSummary} />
        </div>

        <PaymentHealthCards summary={paymentSummary} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RecentBookings bookings={recentBookings} />
        <RecentPayments payments={recentPayments} />
      </div>

      <TopTechnicians technicians={topTechnicians} />
    </main>
  );
};

export default AdminDashboardContent;