import { Suspense } from "react";
import { CalendarClock } from "lucide-react";

import AvailabilityContent from "../_components/availability/AvailabilityContent";
import AvailabilitySkeleton from "../_components/availability/AvailabilitySkeleton";

const TechnicianAvailabilityPage = () => {
  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          <CalendarClock className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Availability Scheduler
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Set your weekly working hours so customers can choose valid booking
            slots.
          </p>
        </div>
      </div>

      <Suspense fallback={<AvailabilitySkeleton />}>
        <AvailabilityContent />
      </Suspense>
    </main>
  );
};

export default TechnicianAvailabilityPage;
