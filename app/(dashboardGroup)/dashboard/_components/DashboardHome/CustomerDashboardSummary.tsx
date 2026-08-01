import { CustomerPayment, CustomerPaymentSummary } from "@/lib/type";
import { Banknote, CheckCircle2, CreditCard, ReceiptText } from "lucide-react";


type CustomerDashboardSummaryProps = {
  summary?: CustomerPaymentSummary | null;
  payments?: CustomerPayment[];
};

const CustomerDashboardSummary = ({
  summary,
  payments = [],
}: CustomerDashboardSummaryProps) => {
  const completedPayments =
    payments?.filter((payment) => payment?.status === "COMPLETED").length ?? 0;

  const latestPayment = payments?.[0];

  const cards = [
    {
      title: "Total Payments",
      value: summary?.totalPayments ?? 0,
      description: "All payment records",
      icon: CreditCard,
      iconClassName: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Paid",
      value: `$${Number(summary?.totalPaid ?? 0).toLocaleString()}`,
      description: "Successfully paid amount",
      icon: Banknote,
      iconClassName: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Completed Payments",
      value: completedPayments,
      description: "Successful transactions",
      icon: CheckCircle2,
      iconClassName: "bg-purple-50 text-purple-600",
    },
    {
      title: "Latest Payment",
      value: latestPayment
        ? `$${Number(latestPayment?.amount ?? 0).toLocaleString()}`
        : "$0",
      description:
        latestPayment?.booking?.service?.title || "No recent payment",
      icon: ReceiptText,
      iconClassName: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                  {card.value}
                </p>
              </div>

              <div className={`shrink-0 rounded-xl p-3 ${card.iconClassName}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-3 truncate text-xs text-slate-500">
              {card.description}
            </p>
          </article>
        );
      })}
    </div>
  );
};

export default CustomerDashboardSummary;
