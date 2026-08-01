import { Skeleton } from "@/components/ui/skeleton";

const BookingTableSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-2 md:max-w-7xl">
      <Skeleton className="mb-4 h-8 w-40" />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Table header */}
        <div className="grid grid-cols-6 gap-4 bg-slate-100 px-4 py-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="mx-auto h-4 w-20" />
          ))}
        </div>

        {/* Table rows */}
        {Array.from({ length: 6 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-6 items-center gap-4 border-t border-slate-100 px-4 py-5"
          >
            <Skeleton className="mx-auto h-5 w-28" />
            <Skeleton className="mx-auto h-5 w-24" />
            <div className="space-y-2">
              <Skeleton className="mx-auto h-4 w-24" />
              <Skeleton className="mx-auto h-3 w-16" />
            </div>
            <Skeleton className="mx-auto h-5 w-20" />
            <Skeleton className="mx-auto h-6 w-20 rounded-full" />
            <Skeleton className="mx-auto h-9 w-24 rounded-md" />
          </div>
        ))}

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-4">
          <Skeleton className="h-4 w-32" />

          <div className="flex gap-2">
            <Skeleton className="h-9 w-20 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTableSkeleton;
