
import { Skeleton } from "@/components/ui/skeleton";

const AvailabilitySkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <div className="border-b bg-slate-50 p-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-11 rounded-xl" />

          <div className="space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>
        </div>
      </div>

      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-1 gap-4 border-b p-6 sm:grid-cols-[180px_1fr]"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-10 rounded-full" />
            <Skeleton className="h-5 w-24" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailabilitySkeleton;
