import { getAllTechniciansAction } from "@/app/(publicGroup)/_actions/technicianActions";

import TechnicianPagination from "./TechnicianPagination";
import { Technician, TechnicianListResponse } from "@/lib/type";
import TechnicianCard from "./technicianCard";
type TechnicianListProps = {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

const TechnicianList = async ({ searchParams }: TechnicianListProps) => {
  const query = await searchParams;

  const result: TechnicianListResponse = await getAllTechniciansAction({
    query,
  });

  if (!result?.success) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <h3 className="font-semibold text-red-700">
          Failed to load technicians
        </h3>

        <p className="mt-1 text-sm text-red-600">
          {result?.message ||
            "Something went wrong while retrieving technicians."}
        </p>
      </div>
    );
  }

  const technicians: Technician[] = result?.data ?? [];

  const currentPage = Math.max(1, Number(result?.meta?.page ?? 1));

  const limit = Math.max(1, Number(result?.meta?.limit ?? 10));

  const total = Math.max(0, Number(result?.meta?.total ?? 0));

  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (!technicians.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <h3 className="font-semibold text-slate-900">No technicians found</h3>

        <p className="mt-1 text-sm text-slate-500">
          Try changing your search or filter options.
        </p>
      </div>
    );
  }

  const firstVisibleItem = (currentPage - 1) * limit + 1;

  const lastVisibleItem = Math.min(currentPage * limit, total);

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
          of <span className="font-medium text-foreground">{total}</span>{" "}
          technicians
        </p>

        <p>
          Page {currentPage} of {totalPages}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {technicians.map((technician) => (
          <TechnicianCard key={technician.id} technician={technician} />
        ))}
      </div>

      <TechnicianPagination currentPage={currentPage} totalPages={totalPages} />
    </section>
  );
};

export default TechnicianList;
