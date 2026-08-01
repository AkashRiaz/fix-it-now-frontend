import { PaymentSummary } from "@/lib/type";
import {
  CheckCircle2,
  CircleAlert,
  Clock3,
} from "lucide-react";


type PaymentHealthCardsProps = {
  summary?: PaymentSummary | null;
};

const PaymentHealthCards = ({
  summary,
}: PaymentHealthCardsProps) => {
  const cards = [
    {
      title: "Completed Payments",
      value: summary?.completedPayments ?? 0,
      icon: CheckCircle2,
      wrapperStyle:
        "border-emerald-200 bg-emerald-50 text-emerald-700",
    },
    {
      title: "Pending Payments",
      value: summary?.pendingPayments ?? 0,
      icon: Clock3,
      wrapperStyle:
        "border-amber-200 bg-amber-50 text-amber-700",
    },
    {
      title: "Failed Payments",
      value: summary?.failedPayments ?? 0,
      icon: CircleAlert,
      wrapperStyle:
        "border-rose-200 bg-rose-50 text-rose-700",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Payment Health
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Monitor successful and unsuccessful payment activity.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`flex items-center justify-between rounded-xl border p-4 ${card.wrapperStyle}`}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5" />

                <span className="text-sm font-semibold">
                  {card.title}
                </span>
              </div>

              <span className="text-xl font-bold">
                {card.value}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PaymentHealthCards;