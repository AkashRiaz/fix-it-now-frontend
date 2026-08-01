import { TechnicianDashboardSummary } from "@/lib/type";
import {
  Banknote,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
} from "lucide-react";


type TechnicianSummaryCardsProps = {
  summary?: TechnicianDashboardSummary | null;
};

const TechnicianSummaryCards = ({ summary }: TechnicianSummaryCardsProps) => {
  const cards = [
    {
      title: "Upcoming Jobs",
      value: summary?.upcomingJobs ?? 0,
      description: "Scheduled jobs waiting ahead",
      icon: Clock3,
      iconWrapper: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Earnings",
      value: `$${Number(summary?.totalEarnings ?? 0).toLocaleString()}`,
      description: "From completed payments",
      icon: Banknote,
      iconWrapper: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Pending Requests",
      value: summary?.pendingRequests ?? 0,
      description: "Waiting for your response",
      icon: BriefcaseBusiness,
      iconWrapper: "bg-amber-50 text-amber-600",
    },
    {
      title: "Completed Jobs",
      value: summary?.completedJobs ?? 0,
      description: "Successfully finished jobs",
      icon: CheckCircle2,
      iconWrapper: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {card.value}
                </p>
              </div>

              <div className={`rounded-xl p-3 ${card.iconWrapper}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">{card.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TechnicianSummaryCards;
