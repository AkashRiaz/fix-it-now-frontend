import { FolderOpen } from "lucide-react";

import CategoryCard from "./CategoryCard";
import { getAllCategories } from "../../_actions/categoryActions";
import { Category } from "@/lib/type";

const CategoryList = async () => {
  const result = await getAllCategories();

  if (!result?.success) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <h3 className="font-semibold text-red-700">
          Failed to load categories
        </h3>

        <p className="mt-1 text-sm text-red-600">
          {result?.message ||
            "Something went wrong while retrieving categories."}
        </p>
      </div>
    );
  }

  const categories = result?.data ?? [];

  if (!categories.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <FolderOpen className="mx-auto h-10 w-10 text-slate-300" />

        <h3 className="mt-4 font-semibold text-slate-900">
          No categories found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Create your first category using the button
          above.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {categories.length} categor
        {categories.length === 1 ? "y" : "ies"} found
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category: Category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryList;