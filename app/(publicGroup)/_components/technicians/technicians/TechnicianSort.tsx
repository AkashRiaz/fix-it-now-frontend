"use client";

import { ArrowDownAZ } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  {
    label: "Newest",
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  {
    label: "Oldest",
    sortBy: "createdAt",
    sortOrder: "asc",
  },
  {
    label: "Highest Rated",
    sortBy: "averageRating",
    sortOrder: "desc",
  },
  {
    label: "Most Completed Jobs",
    sortBy: "completedJobs",
    sortOrder: "desc",
  },
  {
    label: "Lowest Rate",
    sortBy: "hourlyRate",
    sortOrder: "asc",
  },
  {
    label: "Highest Rate",
    sortBy: "hourlyRate",
    sortOrder: "desc",
  },
];

export function TechnicianSort() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "createdAt";

  const sortOrder = searchParams.get("sortOrder") || "desc";

  const currentValue = `${sortBy}:${sortOrder}`;

  const handleSortChange = (value: string) => {
    const [selectedSortBy, selectedSortOrder] = value.split(":");

    const params = new URLSearchParams(searchParams.toString());

    params.set("sortBy", selectedSortBy);
    params.set("sortOrder", selectedSortOrder);

    params.set("page", "1");

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <div className="relative w-full sm:w-auto">
      <ArrowDownAZ className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <select
        value={currentValue}
        onChange={(event) => handleSortChange(event.target.value)}
        aria-label="Sort technicians"
        className="
          h-10
          w-full
          min-w-0
          appearance-none
          truncate
          rounded-md
          border
          border-input
          bg-background
          pl-9
          pr-8
          text-sm
          outline-none
          transition
          focus:border-ring
          focus:ring-2
          focus:ring-ring/30
          sm:w-auto
          sm:min-w-48
        "
      >
        {sortOptions.map((option) => (
          <option
            key={`${option.sortBy}-${option.sortOrder}`}
            value={`${option.sortBy}:${option.sortOrder}`}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
