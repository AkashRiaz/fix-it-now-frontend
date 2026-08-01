import { Suspense } from "react";
import { ServiceToolbar } from "../_components/service/ServiceToolbar";
import { getCategoryAction } from "../_actions/getCategoryAction";
import ServiceListSkeleton from "@/app/(dashboardGroup)/technician-dashboard/_components/services/ServiceListSkeleton";
import { ProvidedServiceList } from "../_components/service/ProvidedServiceList";

type ServicesPageProps = {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function ServicesPage({
  searchParams,
}: ServicesPageProps) {
  const categoriesResult = await getCategoryAction();

  const categories = categoriesResult?.data ?? [];

  const query = await searchParams;

  const suspenseKey = JSON.stringify(query ?? {});

  return (
    <main className="container mx-auto px-4 py-10 md:max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Find Home Services</h1>

        <p className="mt-2 text-muted-foreground">
          Book trusted professionals near you.
        </p>
      </div>

      <ServiceToolbar categories={categories} />

      <div className="mt-8">
        <Suspense key={suspenseKey} fallback={<ServiceListSkeleton />}>
          <ProvidedServiceList searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
