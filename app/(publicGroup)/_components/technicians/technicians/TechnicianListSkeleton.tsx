import { Skeleton } from "@/components/ui/skeleton";

const TechnicianListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <Skeleton className="h-14 w-14 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          <div className="mt-5 space-y-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-28" />
          </div>

          <div className="mt-5 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="mt-5 space-y-3 border-t pt-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-28" />
          </div>

          <Skeleton className="mt-5 h-20 w-full rounded-xl" />
          <Skeleton className="mt-5 h-10 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default TechnicianListSkeleton;
