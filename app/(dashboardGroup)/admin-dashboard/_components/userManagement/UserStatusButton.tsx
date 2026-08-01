"use client";

import { useActionState, useEffect } from "react";
import {
  Ban,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { updateUserStatusAction } from "../../_actions/adminUserActions";

export type UserStatus = "ACTIVE" | "BLOCKED";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};

type UserStatusActionState = {
  success: boolean;
  message: string;
  data?: unknown;
};

type UserStatusButtonProps = {
  user: AdminUser;
};

const initialState: UserStatusActionState = {
  success: false,
  message: "",
};

const UserStatusButton = ({
  user,
}: UserStatusButtonProps) => {
  const [state, formAction, pending] = useActionState(
    updateUserStatusAction,
    initialState,
  );

  const isActive = user?.status === "ACTIVE";

  const nextStatus: UserStatus = isActive
    ? "BLOCKED"
    : "ACTIVE";

  useEffect(() => {
    if (!state?.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input
        type="hidden"
        name="userId"
        value={user.id}
      />

      <input
        type="hidden"
        name="status"
        value={nextStatus}
      />

      <Button
        type="submit"
        size="sm"
        variant={isActive ? "destructive" : "outline"}
        disabled={pending || user?.role === "ADMIN"}
        className={
          isActive
            ? ""
            : "border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
        }
      >
        {pending ? (
          <>
            <LoaderCircle className="mr-1.5 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : isActive ? (
          <>
            <Ban className="mr-1.5 h-4 w-4" />
            Ban
          </>
        ) : (
          <>
            <ShieldCheck className="mr-1.5 h-4 w-4" />
            Unban
          </>
        )}
      </Button>
    </form>
  );
};

export default UserStatusButton;