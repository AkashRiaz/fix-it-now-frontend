import { Suspense } from "react";
import AdminDashboardSkeleton from "./_components/dashboardHome/AdminDashboardSkeleton";
import AdminDashboardContent from "./_components/dashboardHome/AdminDashboardContent";


const AdminDashboardPage = () => {
  return (
    <Suspense fallback={<AdminDashboardSkeleton />}>
      <AdminDashboardContent />
    </Suspense>
  );
};

export default AdminDashboardPage;