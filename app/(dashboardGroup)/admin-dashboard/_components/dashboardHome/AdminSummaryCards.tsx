import { AdminDashboardSummary } from "@/lib/type";
import {
  Banknote,
  BriefcaseBusiness,
  CheckCircle2,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

type AdminSummaryCardsProps = {
  summary?: AdminDashboardSummary | null;
};

const AdminSummaryCards = ({ summary }: AdminSummaryCardsProps) => {
  const cards = [
    {
      title: "Total Users",
      value: summary?.totalUsers ?? 0,
      description: `${summary?.activeUsers ?? 0} active users`,
      icon: UsersRound,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Customers",
      value: summary?.totalCustomers ?? 0,
      description: "Registered customers",
      icon: UserRound,
      iconStyle: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Technicians",
      value: summary?.totalTechnicians ?? 0,
      description: "Registered professionals",
      icon: ShieldCheck,
      iconStyle: "bg-purple-50 text-purple-600",
    },
    {
      title: "Active Bookings",
      value: summary?.activeBookings ?? 0,
      description: "Currently active jobs",
      icon: BriefcaseBusiness,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: "Completed Jobs",
      value: summary?.completedBookings ?? 0,
      description: "Successfully completed",
      icon: CheckCircle2,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Total Revenue",
      value: `$${Number(summary?.totalRevenue ?? 0).toLocaleString()}`,
      description: "Completed payments",
      icon: Banknote,
      iconStyle: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
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

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {card.value}
                </p>
              </div>

              <div className={`shrink-0 rounded-xl p-3 ${card.iconStyle}`}>
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

export default AdminSummaryCards;
