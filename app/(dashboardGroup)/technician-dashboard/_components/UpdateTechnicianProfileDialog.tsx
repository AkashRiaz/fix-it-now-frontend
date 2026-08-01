"use client";

import {
  FormEvent,
  useState,
  useTransition,
} from "react";
import { Pencil } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { updateTechnicianProfileAction } from "../_actions/myProfileAction";

export type TechnicianProfileDetails = {
  id: string;
  userId: string;
  bio: string | null;
  experience: string | null;
  location: string | null;
  hourlyRate: number | null;
  averageRating: number;
  totalReviews: number;
  completedJobs: number;
  createdAt: string;
  updatedAt: string;
};

interface UpdateTechnicianProfileDialogProps {
  profileData?: TechnicianProfileDetails | null;
}

export function UpdateTechnicianProfileDialog({
  profileData,
}: UpdateTechnicianProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        const result =
          await updateTechnicianProfileAction(formData);

        if (!result.success) {
          toast.error(
            result.message ||
              "Failed to update technician profile",
          );

          return;
        }

        toast.success(
          result.message ||
            "Technician profile updated successfully",
        );

        setOpen(false);
      } catch (error) {
        console.error(
          "Technician profile submission error:",
          error,
        );

        toast.error("Something went wrong");
      }
    });
  };

  const handleOpenChange = (value: boolean) => {
    if (pending) return;

    setOpen(value);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger asChild>
        <Button>
          <Pencil className="mr-2 h-4 w-4" />
          Update Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Update Technician Profile
          </DialogTitle>

          <DialogDescription>
            Update your professional information. All
            fields are optional.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="bio">
              Professional Bio
            </Label>

            <Textarea
              id="bio"
              name="bio"
              defaultValue={profileData?.bio || ""}
              placeholder="Describe your skills and services..."
              className="min-h-28 resize-none"
              maxLength={1000}
              disabled={pending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">
              Experience
            </Label>

            <Input
              id="experience"
              name="experience"
              defaultValue={
                profileData?.experience || ""
              }
              placeholder="Example: 5 years"
              disabled={pending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">
              Location
            </Label>

            <Input
              id="location"
              name="location"
              defaultValue={
                profileData?.location || ""
              }
              placeholder="Example: Khulna, Bangladesh"
              disabled={pending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hourlyRate">
              Hourly Rate
            </Label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                $
              </span>

              <Input
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                min="0"
                step="1"
                defaultValue={
                  profileData?.hourlyRate ?? ""
                }
                placeholder="900"
                className="pl-8"
                disabled={pending}
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

            <Button
              type="submit"
              disabled={pending}
            >
              {pending
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}