import { getCategoryAction } from "@/app/(publicGroup)/_actions/getCategoryAction";
import { Suspense } from "react";
import ServiceFormDialog from "../_components/services/ServiceFormDialog";
import ServiceListSkeleton from "../_components/services/ServiceListSkeleton";
import ServiceList from "../_components/services/ServiceList";


const TechnicianServicesPage = async () => {
  const categories = await getCategoryAction();

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8 md:mb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            My Services
          </h1>

          <p className="text-sm text-muted-foreground">
            Create and manage the services you provide.
          </p>
        </div>

        <ServiceFormDialog
          mode="create"
          categories={categories?.data || []}
        />
      </div>

      <Suspense fallback={<ServiceListSkeleton />}>
        <ServiceList
          categories={categories?.data || []}
        />
      </Suspense>
    </div>
  );
};

export default TechnicianServicesPage;