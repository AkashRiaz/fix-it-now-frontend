import Link from "next/link";
import {
  Banknote,
  CalendarDays,
  CreditCard,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CustomerPayment } from "@/lib/type";

type RecentPaymentsProps = {
  payments?: CustomerPayment[];
};

const statusStyles = {
  PENDING:
    "border-amber-200 bg-amber-50 text-amber-700",
  COMPLETED:
    "border-emerald-200 bg-emerald-50 text-emerald-700",
  FAILED:
    "border-rose-200 bg-rose-50 text-rose-700",
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

const RecentPayments = ({
  payments = [],
}: RecentPaymentsProps) => {
  const recentPayments = payments?.slice(0, 3) ?? [];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Payments
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest service payment transactions.
          </p>
        </div>

        <Button asChild size="sm" variant="outline">
          <Link href="/dashboard/payments">
            View All Payments
          </Link>
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        {recentPayments.length > 0 ? (
          recentPayments.map((payment) => (
            <article
              key={payment?.id}
              className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-primary/30 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-start gap-3">
                <div className="shrink-0 rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <Banknote className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-slate-900">
                    {payment?.booking?.service?.title ||
                      "Unknown service"}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <UserRound className="h-3.5 w-3.5" />

                      {payment?.booking?.technician?.user
                        ?.name || "Unknown technician"}
                    </span>

                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />

                      {formatDate(
                        payment?.paidAt ||
                          payment?.createdAt,
                      )}
                    </span>

                    <span className="flex items-center gap-1">
                      <CreditCard className="h-3.5 w-3.5" />

                      {payment?.provider || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <p className="text-lg font-bold text-slate-900">
                  ৳
                  {Number(
                    payment?.amount ?? 0,
                  ).toLocaleString()}
                </p>

                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                    statusStyles[
                      payment?.status || "PENDING"
                    ]
                  }`}
                >
                  {payment?.status || "PENDING"}
                </span>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-10 text-center">
            <CreditCard className="mx-auto h-8 w-8 text-slate-300" />

            <h3 className="mt-3 font-semibold text-slate-800">
              No payment history
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Your completed service payments will appear
              here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentPayments;