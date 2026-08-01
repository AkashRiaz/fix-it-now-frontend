import { RecentPayment } from "@/lib/type";
import {
  Banknote,
  CalendarDays,
  CreditCard,
} from "lucide-react";


type RecentPaymentsProps = {
  payments?: RecentPayment[];
};

const paymentStatusStyles: Record<string, string> = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  COMPLETED:
    "border-emerald-200 bg-emerald-50 text-emerald-700",
  FAILED: "border-rose-200 bg-rose-50 text-rose-700",
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
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Payments
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest transactions across the platform.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {payments?.length > 0 ? (
          payments.map((payment) => (
            <article
              key={payment?.id}
              className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
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
                    <span>
                      {payment?.booking?.customer?.name ||
                        "Unknown customer"}
                    </span>

                    <span className="flex items-center gap-1">
                      <CreditCard className="h-3.5 w-3.5" />

                      {payment?.provider || "Unknown"}
                    </span>

                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />

                      {formatDate(
                        payment?.paidAt ||
                          payment?.createdAt,
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <p className="text-lg font-bold text-slate-900">
                  $
                  {Number(
                    payment?.amount ?? 0,
                  ).toLocaleString()}
                </p>

                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                    paymentStatusStyles[
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
          <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
            <p className="text-sm text-slate-500">
              No recent payments found.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentPayments;