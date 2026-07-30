"use client";

import { Input } from "@/components/ui/input";

import { SearchIcon } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useRef } from "react";

export function ServiceSearchBar() {
  const pathname = usePathname();

  const router = useRouter();

  const searchParams = useSearchParams();

  const debounceReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (value: string) => {
    if (debounceReference.current) {
      clearTimeout(debounceReference.current);
    }

    debounceReference.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set("searchTerm", value);
      } else {
        params.delete("searchTerm");
      }

      router.replace(`${pathname}?${params.toString()}`);
    }, 500);
  };

  return (
    <div className="relative min-w-md ">
      <SearchIcon
        className="
          absolute
          left-3
          top-1/2
          size-4
          -translate-y-1/2
          text-muted-foreground
        "
      />

      <Input
        defaultValue={searchParams.get("searchTerm") || ""}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search services..."
        className="pl-9 "
      />
    </div>
  );
}
