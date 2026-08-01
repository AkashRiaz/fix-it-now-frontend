import { IService } from "@/lib/type";

import { getServiceAction } from "../../_actions/serviceActions";
import { ServiceCard } from "./ServiceCard";
import { ServicePagination } from "./ServicePagination";

type ProvidedServiceListProps = {
  searchParams?: Promise<{
    [key: string]:
      | string
      | string[]
      | undefined;
  }>;
};

export async function ProvidedServiceList({
  searchParams,
}: ProvidedServiceListProps) {
  const query = await searchParams;

  const result = await getServiceAction({
    query,
  });

  if (!result?.success) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-10 text-center">
        <h3 className="font-semibold text-red-700">
          Failed to load services
        </h3>

        <p className="mt-1 text-sm text-red-600">
          {result?.message ||
            "Something went wrong while loading services."}
        </p>
      </div>
    );
  }

  const services: IService[] =
    result?.data ?? [];

  const currentPage = Math.max(
    1,
    Number(result?.meta?.page ?? 1),
  );

  const limit = Math.max(
    1,
    Number(result?.meta?.limit ?? 10),
  );

  const total = Math.max(
    0,
    Number(result?.meta?.total ?? 0),
  );

  const totalPages = Math.max(
    1,
    Math.ceil(total / limit),
  );

  if (!services.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <h3 className="text-lg font-semibold text-slate-900">
          No services found
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Try changing your search term or filter options.
        </p>
      </div>
    );
  }

  const firstVisibleItem =
    (currentPage - 1) * limit + 1;

  const lastVisibleItem = Math.min(
    currentPage * limit,
    total,
  );

  return (
    <section>
      <div className="mb-5 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          Showing{" "}
          <span className="font-medium text-foreground">
            {firstVisibleItem}
          </span>
          {" – "}
          <span className="font-medium text-foreground">
            {lastVisibleItem}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">
            {total}
          </span>{" "}
          services
        </p>

        <p>
          Page {currentPage} of {totalPages}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
          />
        ))}
      </div>

      <ServicePagination
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </section>
  );
}