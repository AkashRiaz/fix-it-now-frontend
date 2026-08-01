import {
  AlertCircle,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { getCustomerPaymentsAction } from "./_actions/customerPaymentActions";
import CustomerDashboardSummary from "./_components/DashboardHome/CustomerDashboardSummary";
import RecentPayments from "./_components/DashboardHome/RecentPayments";

const CustomerDashboardPage = async () => {
  const result = await getCustomerPaymentsAction();

  if (!result?.success) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-red-800">
            Dashboard unavailable
          </h2>

          <p className="mt-1 text-sm text-red-600">
            {result?.message ||
              "Unable to retrieve dashboard information."}
          </p>
        </div>
      </main>
    );
  }

  const summary = result?.data?.summary;

  const payments =
    result?.data?.payments ?? [];

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-primary/10 p-3 text-primary">
            <LayoutDashboard className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Customer Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Review your service payments and manage your
              bookings.
            </p>
          </div>
        </div>

        <Button asChild>
          <Link href="/services">
            Browse Services
          </Link>
        </Button>
      </div>

      <CustomerDashboardSummary
        summary={summary}
        payments={payments}
      />

      <RecentPayments payments={payments} />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link
          href="/dashboard/bookings"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
        >
          <h2 className="font-semibold text-slate-900">
            Manage Bookings
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            View statuses, complete payments and leave
            reviews after completed jobs.
          </p>

          <p className="mt-4 text-sm font-semibold text-primary">
            View My Bookings →
          </p>
        </Link>

        <Link
          href="/dashboard/payments"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
        >
          <h2 className="font-semibold text-slate-900">
            Payment History
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            View your previous transactions, payment
            amounts and statuses.
          </p>

          <p className="mt-4 text-sm font-semibold text-primary">
            View Payment History →
          </p>
        </Link>
      </section>
    </main>
  );
};

export default CustomerDashboardPage;