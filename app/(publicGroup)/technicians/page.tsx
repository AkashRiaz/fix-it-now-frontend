import React, { Suspense } from "react";
import TechnicianListSkeleton from "../_components/technicians/technicians/TechnicianListSkeleton";
import TechnicianList from "../_components/technicians/technicians/TechnicianList";

const TechniciansPage = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8 md:mb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">All Technicians</h1>

          <p className="text-sm text-muted-foreground">
            Browse and manage all the technicians registered on the platform.
          </p>
        </div>
      </div>

      <Suspense fallback={<TechnicianListSkeleton />}>
        <TechnicianList />
      </Suspense>
    </div>
  );
};

export default TechniciansPage;
