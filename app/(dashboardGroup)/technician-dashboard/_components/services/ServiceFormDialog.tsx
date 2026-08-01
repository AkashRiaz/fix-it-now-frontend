/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon, PlusIcon } from "lucide-react";
import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";

import {
  createServiceAction,
  updateServiceAction,
} from "../../_actions/technicianServiceActions";

export type ServiceCategory = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TechnicianService = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration: number;
  isFeatured: boolean;
  technicianId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;

  category: {
    id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
  };

  technician?: {
    id: string;
    location: string;
    averageRating: number;
    totalReviews: number;

    user?: {
      id: string;
      name: string;
    };
  };
};
type ServiceFormDialogProps = {
  mode: "create" | "edit";
  categories: ServiceCategory[];
  service?: TechnicianService;
};

const ServiceFormDialog = ({
  mode,
  categories,
  service,
}: ServiceFormDialogProps) => {
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
          isEditMode && service
            ? await updateServiceAction(service.id, formData)
            : await createServiceAction(formData);

        if (!result?.success) {
          toast.error(result?.message || "Something went wrong");

          return;
        }

        toast.success(
          result.message ||
            (isEditMode
              ? "Service updated successfully"
              : "Service created successfully"),
        );

        if (!isEditMode) {
          form.reset();
        }

        setOpen(false);
      } catch (error) {
        console.error("Service form error:", error);

        toast.error("Something went wrong");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditMode ? (
          <Button variant="outline" size="sm">
            <PencilIcon data-icon="inline-start" />
            Edit
          </Button>
        ) : (
          <Button>
            <PlusIcon data-icon="inline-start" />
            Create Service
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Service" : "Create Service"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`title-${service?.id || "new"}`}>Title</Label>

            <Input
              id={`title-${service?.id || "new"}`}
              name="title"
              defaultValue={service?.title || ""}
              placeholder="PC General Service"
              disabled={pending}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${service?.id || "new"}`}>
              Description
            </Label>

            <Textarea
              id={`description-${service?.id || "new"}`}
              name="description"
              defaultValue={service?.description || ""}
              placeholder="Describe what is included in this service..."
              className="min-h-32"
              disabled={pending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`categoryId-${service?.id || "new"}`}>
              Category
            </Label>

            <select
              id={`categoryId-${service?.id || "new"}`}
              name="categoryId"
              defaultValue={service?.categoryId || ""}
              disabled={pending}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`price-${service?.id || "new"}`}>Price</Label>

              <Input
                id={`price-${service?.id || "new"}`}
                name="price"
                type="number"
                min="0"
                step="0.01"
                defaultValue={service?.price ?? ""}
                placeholder="200"
                disabled={pending}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`duration-${service?.id || "new"}`}>
                Duration
              </Label>

              <Input
                id={`duration-${service?.id || "new"}`}
                name="duration"
                type="number"
                min="1"
                step="1"
                defaultValue={service?.duration ?? ""}
                placeholder="20 minutes"
                disabled={pending}
                required
              />
            </div>
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

            <Button type="submit" disabled={pending || !categories.length}>
              {pending
                ? "Saving..."
                : isEditMode
                  ? "Save Changes"
                  : "Create Service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceFormDialog;
