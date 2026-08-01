import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CategoriesListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index}>
          <CardHeader className="space-y-4">
            <div className="flex items-start justify-between">
              <Skeleton className="h-11 w-11 rounded-xl" />

              <Skeleton className="h-8 w-16 rounded-md" />
            </div>

            <Skeleton className="h-6 w-36" />
          </CardHeader>

          <CardContent className="space-y-4">
            <Skeleton className="h-16 w-full rounded-xl" />

            <div className="space-y-3 border-t pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CategoriesListSkeleton;