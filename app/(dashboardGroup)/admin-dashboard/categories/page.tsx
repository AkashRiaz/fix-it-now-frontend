import { Suspense } from "react";
import { FolderKanban } from "lucide-react";
import CategoryFormDialog from "../_components/categories/CategoryFormDialog";
import CategoriesListSkeleton from "../_components/categories/CategoriesListSkeleton";
import CategoryList from "../_components/categories/CategoryList";


const CategoryManagementPage = () => {
  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-primary/10 p-3 text-primary">
            <FolderKanban className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold">
              Category Management
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Create and manage service categories.
            </p>
          </div>
        </div>

        <CategoryFormDialog mode="create" />
      </div>

      <Suspense
        fallback={<CategoriesListSkeleton />}
      >
        <CategoryList />
      </Suspense>
    </main>
  );
};

export default CategoryManagementPage;