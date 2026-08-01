import { getTechnicianServices } from "../../_actions/technicianServiceActions";

import ServiceCard from "./ServiceCard";
import type {
  ServiceCategory,
  TechnicianService,
} from "./ServiceFormDialog";

type ServiceListProps = {
  categories: ServiceCategory[];
};

const ServiceList = async ({
  categories,
}: ServiceListProps) => {
  const result = await getTechnicianServices();

  if (!result?.success) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center">
        <p className="font-medium text-destructive">
          {result?.message ||
            "Failed to retrieve services."}
        </p>
      </div>
    );
  }

  if (!result.data?.length) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center">
        <h3 className="font-semibold">
          No services found
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Create your first service using the button
          above.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {result.data.map(
        (service: TechnicianService) => (
          <ServiceCard
            key={service.id}
            service={service}
            categories={categories}
          />
        ),
      )}
    </div>
  );
};

export default ServiceList;