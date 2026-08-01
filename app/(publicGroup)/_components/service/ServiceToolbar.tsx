import type { ServiceCategory } from "./ServiceFilterSheet";
import { ServiceFilterSheet } from "./ServiceFilterSheet";
import { ServiceSearchBar } from "./ServiceSearchBar";
import { ServiceSort } from "./ServiceSort";

type ServiceToolbarProps = {
  categories?: ServiceCategory[];
};

export function ServiceToolbar({
  categories = [],
}: ServiceToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <ServiceSearchBar />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <ServiceSort />

        <ServiceFilterSheet
          categories={categories}
        />
      </div>
    </div>
  );
}