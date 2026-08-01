import { AlertCircle, LayoutDashboard } from "lucide-react";
import { getTechnicianDashboardAction } from "./_actions/getTechnicianDashboardAction";
import TechnicianSummaryCards from "./_components/DashboardHome/TechnicianSummaryCards";
import UpcomingJobs from "./_components/DashboardHome/UpcomingJobs";
import PendingRequests from "./_components/DashboardHome/PendingRequests";
import RecentPayments from "./_components/DashboardHome/RecentPayments";

const TechnicianDashboardPage = async () => {
  const result = await getTechnicianDashboardAction();

  if (!result?.success) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-red-800">
            Dashboard unavailable
          </h2>

          <p className="mt-1 text-sm text-red-600">
            {result?.message || "Unable to retrieve dashboard information."}
          </p>
        </div>
      </div>
    );
  }

  const summary = result?.data?.summary;

  const upcomingBookings = result?.data?.upcomingBookings ?? [];

  const pendingBookings = result?.data?.pendingBookings ?? [];

  const recentPayments = result?.data?.recentPayments ?? [];

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          <LayoutDashboard className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Technician Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor your jobs, requests, completed work and earnings.
          </p>
        </div>
      </div>

      <TechnicianSummaryCards summary={summary} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <UpcomingJobs bookings={upcomingBookings} />
        </div>

        <PendingRequests bookings={pendingBookings} />
      </div>

      <RecentPayments payments={recentPayments} />
    </main>
  );
};

export default TechnicianDashboardPage;
