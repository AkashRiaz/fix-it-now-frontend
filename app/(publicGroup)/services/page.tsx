import { ProvidedServiceList } from "../_components/service/ProvidedServiceList";
import { ServiceSearchBar } from "../_components/service/ServiceSearchBar";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  return (
    <main
      className="
        container
        mx-auto
        px-4
        py-10
        md:max-w-7xl
      "
    >
      <div className="mb-8">
        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Find Home Services
        </h1>

        <p className="mt-2 text-muted-foreground">
          Book trusted professionals near you.
        </p>
      </div>

      <div className="flex justify-end w-full">
        <ServiceSearchBar />
      </div>

      <div className="mt-10">
        <ProvidedServiceList searchParams={searchParams} />
      </div>
    </main>
  );
}
