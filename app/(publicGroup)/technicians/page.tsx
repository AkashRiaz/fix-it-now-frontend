import { Suspense } from "react";
import { TechnicianToolbar } from "../_components/technicians/technicians/TechnicianToolbar";
import TechnicianListSkeleton from "../_components/technicians/technicians/TechnicianListSkeleton";
import TechnicianList from "../_components/technicians/technicians/TechnicianList";
type TechniciansPageProps = {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

const TechniciansPage = ({ searchParams }: TechniciansPageProps) => {
  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold">Find Trusted Technicians</h1>

        <p className="mt-2 text-muted-foreground">
          Search and filter experienced professionals based on location, rating
          and hourly rate.
        </p>
      </div>

      <TechnicianToolbar />

      <Suspense fallback={<TechnicianListSkeleton />}>
        <TechnicianList searchParams={searchParams} />
      </Suspense>
    </main>
  );
};

export default TechniciansPage;
