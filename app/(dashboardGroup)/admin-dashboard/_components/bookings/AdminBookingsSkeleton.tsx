import { Skeleton } from "@/components/ui/skeleton";

const AdminBookingsSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-2xl border bg-white p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-3 w-36" />
              </div>

              <Skeleton className="size-11 rounded-xl" />
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white">
        <div className="border-b p-5">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-2 h-4 w-44" />
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-7 gap-4 border-b bg-slate-50 p-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-full" />
            ))}
          </div>

          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-7 gap-4 border-b p-4">
              {Array.from({ length: 7 }).map((_, columnIndex) => (
                <Skeleton key={columnIndex} className="h-12 w-full" />
              ))}
            </div>
          ))}
        </div>

        <div className="divide-y md:hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-4 p-5">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBookingsSkeleton;
