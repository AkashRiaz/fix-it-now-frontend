import { getAllTechniciansAction } from "@/app/(publicGroup)/_actions/technicianActions";
import { Technician, TechnicianListResponse } from "@/lib/type";
import TechnicianCard from "./technicianCard";



type TechnicianListProps = {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

const TechnicianList = async ({
  searchParams,
}: TechnicianListProps) => {
  const query = await searchParams;

  const result: TechnicianListResponse =
    await getAllTechniciansAction({
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

  if (!result.data?.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <h3 className="font-semibold text-slate-900">
          No technicians found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Try changing your search or filter options.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing {result.data.length} of{" "}
          {result.meta?.total || result.data.length}{" "}
          technicians
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {result.data.map((technician: Technician) => (
          <TechnicianCard
            key={technician.id}
            technician={technician}
          />
        ))}
      </div>
    </section>
  );
};

export default TechnicianList;