"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export function TechnicianSearchBar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const debounceReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchTerm = searchParams.get("searchTerm") || "";

  const updateSearch = (value: string) => {
    if (debounceReference.current) {
      clearTimeout(debounceReference.current);
    }

    debounceReference.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      const trimmedValue = value.trim();

      if (trimmedValue) {
        params.set("searchTerm", trimmedValue);
      } else {
        params.delete("searchTerm");
      }

      params.delete("page");

      const queryString = params.toString();

      router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    }, 500);
  };

  const clearSearch = () => {
    if (debounceReference.current) {
      clearTimeout(debounceReference.current);
    }

    const params = new URLSearchParams(searchParams.toString());

    params.delete("searchTerm");
    params.delete("page");

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <div className="relative w-full md:max-w-md">
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        key={searchTerm}
        defaultValue={searchTerm}
        onChange={(event) => updateSearch(event.target.value)}
        placeholder="Search technician, location, experience..."
        className="pr-10 pl-9"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
