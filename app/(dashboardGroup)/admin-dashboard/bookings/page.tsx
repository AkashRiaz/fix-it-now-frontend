import { Suspense } from "react";
import { CalendarCheck2 } from "lucide-react";
import AdminBookingsSkeleton from "../_components/bookings/AdminBookingsSkeleton";
import AdminBookingsContent from "../_components/bookings/AdminBookingsContent";


const AdminBookingsPage = () => {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          <CalendarCheck2 className="size-6" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Booking Management
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View all customer bookings, assigned technicians, schedules and
            booking statuses.
          </p>
        </div>
      </div>

      <Suspense fallback={<AdminBookingsSkeleton />}>
        <AdminBookingsContent />
      </Suspense>
    </main>
  );
};

export default AdminBookingsPage;
