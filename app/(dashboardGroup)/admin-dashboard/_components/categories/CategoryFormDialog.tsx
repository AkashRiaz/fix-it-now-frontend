"use client";

import { FormEvent, useState, useTransition } from "react";
import { FolderPlus, PencilIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category } from "@/lib/type";
import { createCategoryAction, updateCategoryAction } from "../../_actions/categoryActions";


type CategoryFormDialogProps = {
  mode: "create" | "edit";
  category?: Category;
};

const CategoryFormDialog = ({ mode, category }: CategoryFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const isEditMode = mode === "edit";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      try {
        const result =
          isEditMode && category
            ? await updateCategoryAction(category.id, formData)
            : await createCategoryAction(formData);

        if (!result?.success) {
          toast.error(result?.message || "Something went wrong");

          return;
        }

        toast.success(
          result.message ||
            (isEditMode
              ? "Category updated successfully"
              : "Category created successfully"),
        );

        if (!isEditMode) {
          form.reset();
        }

        setOpen(false);
      } catch (error) {
        console.error("Category form error:", error);

        toast.error("Something went wrong");
      }
    });
  };

  const handleOpenChange = (value: boolean) => {
    if (pending) return;

    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isEditMode ? (
          <Button variant="outline" size="sm">
            <PencilIcon className="mr-2 h-4 w-4" />
            Edit
          </Button>
        ) : (
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Category
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FolderPlus className="h-5 w-5" />
          </div>

          <DialogTitle>
            {isEditMode ? "Edit Category" : "Create Category"}
          </DialogTitle>

          <DialogDescription>
            {isEditMode
              ? "Update the category name."
              : "Create a new category for technician services."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor={`category-name-${category?.id || "new"}`}>
              Category Name
            </Label>

            <Input
              id={`category-name-${category?.id || "new"}`}
              name="name"
              defaultValue={category?.name || ""}
              placeholder="Example: PC Repairs"
              disabled={pending}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={pending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={pending}>
              {pending
                ? "Saving..."
                : isEditMode
                  ? "Save Changes"
                  : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryFormDialog;
