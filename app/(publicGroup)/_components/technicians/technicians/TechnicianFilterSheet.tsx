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

const filterKeys = ["location", "status", "minHourlyRate", "maxHourlyRate"];

export function TechnicianFilterSheet() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeFilterCount = filterKeys.filter((key) =>
    searchParams.get(key),
  ).length;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const params = new URLSearchParams(searchParams.toString());

    const location = formData.get("location")?.toString().trim();

    const status = formData.get("status")?.toString().trim();

    const minHourlyRate = formData.get("minHourlyRate")?.toString().trim();

    const maxHourlyRate = formData.get("maxHourlyRate")?.toString().trim();

    if (location) {
      params.set("location", location);
    } else {
      params.delete("location");
    }

    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    if (minHourlyRate) {
      params.set("minHourlyRate", minHourlyRate);
    } else {
      params.delete("minHourlyRate");
    }

    if (maxHourlyRate) {
      params.set("maxHourlyRate", maxHourlyRate);
    } else {
      params.delete("maxHourlyRate");
    }

    params.delete("page");

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname);

    setOpen(false);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());

    filterKeys.forEach((key) => {
      params.delete(key);
    });

    params.delete("page");

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname);

    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button type="button" variant="outline" className="relative">
          <Filter className="mr-2 size-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 inline-flex size-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md px-5">
        <SheetHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <SlidersHorizontal className="size-5" />
          </div>

          <SheetTitle>Filter Technicians</SheetTitle>

          <SheetDescription>
            Filter technicians by location, account status and hourly rate.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-[calc(100vh-150px)] flex-col"
        >
          <div className="flex-1 space-y-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>

              <Input
                id="location"
                name="location"
                defaultValue={searchParams.get("location") || ""}
                placeholder="Example: Khulna, Bangladesh"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Account Status</Label>

              <select
                id="status"
                name="status"
                defaultValue={searchParams.get("status") || ""}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              >
                <option value="">All statuses</option>

                <option value="ACTIVE">Active</option>

                <option value="INACTIVE">Inactive</option>
              </select>
            </div>

            <div className="space-y-3">
              <Label>Hourly Rate Range</Label>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label
                    htmlFor="minHourlyRate"
                    className="text-xs text-muted-foreground"
                  >
                    Minimum
                  </Label>

                  <Input
                    id="minHourlyRate"
                    name="minHourlyRate"
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={searchParams.get("minHourlyRate") || ""}
                    placeholder="500"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="maxHourlyRate"
                    className="text-xs text-muted-foreground"
                  >
                    Maximum
                  </Label>

                  <Input
                    id="maxHourlyRate"
                    name="maxHourlyRate"
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={searchParams.get("maxHourlyRate") || ""}
                    placeholder="2000"
                  />
                </div>
              </div>
            </div>
          </div>

          <SheetFooter className="border-t pt-4">
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
