"use client";

import { ArrowDownAZ } from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

const sortOptions = [
  {
    label: "Newest",
    value: "createdAt:desc",
  },
  {
    label: "Oldest",
    value: "createdAt:asc",
  },
  {
    label: "Price: Low to High",
    value: "price:asc",
  },
  {
    label: "Price: High to Low",
    value: "price:desc",
  },
  {
    label: "Duration: Shortest",
    value: "duration:asc",
  },
  {
    label: "Duration: Longest",
    value: "duration:desc",
  },
  {
    label: "Title: A to Z",
    value: "title:asc",
  },
  {
    label: "Title: Z to A",
    value: "title:desc",
  },
];

export function ServiceSort() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSortBy =
    searchParams.get("sortBy") || "createdAt";

  const currentSortOrder =
    searchParams.get("sortOrder") || "desc";

  const currentValue = `${currentSortBy}:${currentSortOrder}`;

  const handleChange = (value: string) => {
    const [sortBy, sortOrder] = value.split(":");

    const params = new URLSearchParams(
      searchParams.toString(),
    );

    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    params.set("page", "1");

    router.replace(
      `${pathname}?${params.toString()}`,
    );
  };

  return (
    <div className="relative w-full sm:w-auto">
      <ArrowDownAZ className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <select
        value={currentValue}
        onChange={(event) =>
          handleChange(event.target.value)
        }
        className="h-10 w-full min-w-52 rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
      >
        {sortOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}