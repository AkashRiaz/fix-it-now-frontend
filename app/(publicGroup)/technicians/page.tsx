import { Suspense } from "react";
import { TechnicianToolbar } from "../_components/technicians/technicians/TechnicianToolbar";
import TechnicianListSkeleton from "../_components/technicians/technicians/TechnicianListSkeleton";
import TechnicianList from "../_components/technicians/technicians/TechnicianList";


type TechniciansPageProps = {
  searchParams?: Promise<{
    [key: string]:
      | string
      | string[]
      | undefined;
  }>;
};

const TechniciansPage = async ({
  searchParams,
}: TechniciansPageProps) => {
  const query = await searchParams;

  const suspenseKey = JSON.stringify(query ?? {});

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Find Trusted Technicians
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Browse experienced professionals based on
          location, status and hourly rate.
        </p>
      </div>

      <TechnicianToolbar />

      <Suspense
        key={suspenseKey}
        fallback={<TechnicianListSkeleton />}
      >
        <TechnicianList
          searchParams={searchParams}
        />
      </Suspense>
    </main>
  );
};

export default TechniciansPage;