import { IService } from "@/lib/type";
import { getServiceAction } from "../../_actions/serviceActions";
import { ServiceCard } from "./ServiceCard";

export async function ProvidedServiceList({
  searchParams,
}: {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const query = await searchParams;

  const result = await getServiceAction({
    query,
  });

  if (!result.success || !result.data?.length) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No services found.
      </p>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {result?.data?.map((service: IService) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
