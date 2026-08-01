import { RecentPayment } from "@/lib/type";
import { Banknote, CalendarDays, CreditCard, UserRound } from "lucide-react";

type RecentPaymentsProps = {
  payments?: RecentPayment[];
};

const paymentStatusStyles = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  COMPLETED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  FAILED: "border-rose-200 bg-rose-50 text-rose-700",
};

const RecentPayments = ({ payments = [] }: RecentPaymentsProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Payments
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your latest completed customer payments.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {payments?.length > 0 ? (
          payments.slice(0, 5).map((payment) => {
            const paymentDate = new Date(payment?.paidAt || payment?.createdAt);

            return (
              <div
                key={payment?.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                    <Banknote className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {payment?.booking?.service?.title || "Unknown service"}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <UserRound className="h-3.5 w-3.5" />

                        {payment?.booking?.customer?.name || "Unknown customer"}
                      </span>

                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />

                        {!Number.isNaN(paymentDate.getTime())
                          ? paymentDate.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Invalid date"}
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
                    ৳{Number(payment?.amount ?? 0).toLocaleString()}
                  </p>

                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                      paymentStatusStyles[payment?.status || "PENDING"]
                    }`}
                  >
                    {payment?.status || "PENDING"}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-10 text-center">
            <Banknote className="mx-auto h-8 w-8 text-slate-300" />

            <h3 className="mt-3 font-semibold text-slate-800">
              No payments found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Completed customer payments will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentPayments;
