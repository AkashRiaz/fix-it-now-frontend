"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { loginActions } from "../_actions/authActions";

const LoginForm = () => {
  type LoginFormValues = {
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [state, formAction, loading] = useActionState(loginActions, null);
  const [isPending, startTransition] = useTransition();
  const onSubmit = (data: LoginFormValues) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Login successful");
      // router.push("/dashboard");
    }
    if (!state.success) {
      toast.error(state.message || "Something went wrong");
    }
  }, [state]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Card className="p-6 space-y-4">
        <div className="space-y-1">
          <Input
            type="email"
            placeholder="Enter Your Email"
            disabled={loading}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Input
            type="password"
            placeholder="Enter Your Password"
            disabled={loading}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must contain at least 6 characters",
              },
            })}
          />

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button disabled={loading || isPending}>
          {loading || isPending ? "Loading..." : "Login"}
        </Button>
      </Card>
    </form>
  );
};

export default LoginForm;
