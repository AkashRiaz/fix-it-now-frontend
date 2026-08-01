"use client";

import { FormEvent, useState } from "react";
import { Filter, RotateCcw, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type ServiceCategory = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

type ServiceFilterSheetProps = {
  categories?: ServiceCategory[];
};

const filterKeys = ["category", "location", "rating", "minPrice", "maxPrice"];

export function ServiceFilterSheet({
  categories = [],
}: ServiceFilterSheetProps) {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeFilterCount = filterKeys.filter((key) =>
    Boolean(searchParams.get(key)),
  ).length;

  const updateURL = (params: URLSearchParams) => {
    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const params = new URLSearchParams(searchParams.toString());

    filterKeys.forEach((key) => {
      const value = formData.get(key)?.toString().trim() || "";

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.set("page", "1");

    updateURL(params);
    setOpen(false);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());

    filterKeys.forEach((key) => {
      params.delete(key);
    });

    params.set("page", "1");

    updateURL(params);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="relative w-full sm:w-auto"
        >
          <Filter className="mr-2 size-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 inline-flex size-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full flex-col overflow-y-auto sm:max-w-md"
      >
        <SheetHeader className="px-5">
          <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <SlidersHorizontal className="size-5" />
          </div>

          <SheetTitle>Filter Services</SheetTitle>

          <SheetDescription>
            Filter services by category, technician location, rating and price.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
          <div className="flex-1 space-y-6 px-5 py-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>

              <select
                id="category"
                name="category"
                defaultValue={searchParams.get("category") || ""}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              >
                <option value="">All categories</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Technician Location</Label>

              <Input
                id="location"
                name="location"
                defaultValue={searchParams.get("location") || ""}
                placeholder="Example: Khulna, Bangladesh"
              />

              <p className="text-xs text-muted-foreground">
                Enter the complete location because your backend uses an exact
                match.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Minimum Technician Rating</Label>

              <select
                id="rating"
                name="rating"
                defaultValue={searchParams.get("rating") || ""}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              >
                <option value="">Any rating</option>

                <option value="5">5 stars</option>

                <option value="4">4 stars or higher</option>

                <option value="3">3 stars or higher</option>

                <option value="2">2 stars or higher</option>

                <option value="1">1 star or higher</option>
              </select>
            </div>

            <div className="space-y-3">
              <Label>Price Range</Label>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label
                    htmlFor="minPrice"
                    className="text-xs text-muted-foreground"
                  >
                    Minimum
                  </Label>

                  <Input
                    id="minPrice"
                    name="minPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={searchParams.get("minPrice") || ""}
                    placeholder="500"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="maxPrice"
                    className="text-xs text-muted-foreground"
                  >
                    Maximum
                  </Label>

                  <Input
                    id="maxPrice"
                    name="maxPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={searchParams.get("maxPrice") || ""}
                    placeholder="5000"
                  />
                </div>
              </div>
            </div>
          </div>

          <SheetFooter className="border-t px-5 py-5">
            <Button type="button" variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 size-4" />
              Reset
            </Button>

            <Button type="submit">Apply Filters</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
