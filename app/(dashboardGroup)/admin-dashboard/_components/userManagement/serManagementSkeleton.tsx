import { Skeleton } from "@/components/ui/skeleton";

const UserManagementSkeleton = () => {
  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white">
        <Skeleton className="h-12 w-full rounded-none" />

        {Array.from({
          length: 8,
        }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-6 items-center gap-4 border-t px-5 py-4"
          >
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-9 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagementSkeleton;