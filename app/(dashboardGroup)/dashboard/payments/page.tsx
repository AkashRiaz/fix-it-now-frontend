import { CreditCard } from "lucide-react";

import { getCustomerPaymentsAction } from "../_actions/customerPaymentActions";
import CustomerDashboardSummary from "../_components/DashboardHome/CustomerDashboardSummary";
import PaymentHistoryTable from "../_components/DashboardHome/PaymentHistoryTable";
const CustomerPaymentHistoryPage = async () => {
  const result = await getCustomerPaymentsAction();

  const summary = result?.data?.summary;

  const payments =
    result?.data?.payments ?? [];

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          <CreditCard className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Payment History
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View all your service payment transactions.
          </p>
        </div>
      </div>

      <CustomerDashboardSummary
        summary={summary}
        payments={payments}
      />

      <PaymentHistoryTable data={payments} />
    </main>
  );
};

export default CustomerPaymentHistoryPage;