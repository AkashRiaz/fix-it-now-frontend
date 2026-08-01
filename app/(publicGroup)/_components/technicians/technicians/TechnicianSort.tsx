"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

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
    label: "Most Experienced",
    sortBy: "experience",
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

  const sortBy =
    searchParams.get("sortBy") || "createdAt";

  const sortOrder =
    searchParams.get("sortOrder") || "desc";

  const currentValue = `${sortBy}:${sortOrder}`;

  const handleSortChange = (value: string) => {
    const [selectedSortBy, selectedSortOrder] =
      value.split(":");

    const params = new URLSearchParams(
      searchParams.toString(),
    );

    params.set("sortBy", selectedSortBy);
    params.set("sortOrder", selectedSortOrder);
    params.delete("page");

    router.replace(
      `${pathname}?${params.toString()}`,
    );
  };

  return (
    <select
      value={currentValue}
      onChange={(event) =>
        handleSortChange(event.target.value)
      }
      className="h-10 min-w-44 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
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
  );
}