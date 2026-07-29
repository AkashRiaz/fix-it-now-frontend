"use client";

import { useForm } from "react-hook-form";
import { useActionState, useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { registerAction } from "../_actions/authActions";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: "CUSTOMER" | "TECHNICIAN";
};

const RegisterForm = () => {
  const [state, formAction, loading] = useActionState(registerAction, null);
  const [isPending, startTransition] = useTransition();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      role: "CUSTOMER",
    },
  });

  const password = watch("password");

  const onSubmit = (data: RegisterFormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);

    formData.append("email", data.email);

    // only password goes to backend
    formData.append("password", data.password);

    formData.append("phone", data.phone);

    formData.append("role", data.role);

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Registration successful");
    } else {
      toast.error(state.message || "Something went wrong");
    }
  }, [state]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Card className="p-6 space-y-4">
        {/* Name */}
        <div>
          <Input
            placeholder="Full Name"
            {...register("name", {
              required: "Name is required",
            })}
          />

          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Input
            placeholder="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Input
            placeholder="Phone"
            {...register("phone", {
              required: "Phone is required",
            })}
          />

          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <Input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Input
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Confirm password is required",

              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <select
            className="w-full border rounded-md p-2"
            {...register("role", {
              required: "Role is required",
            })}
          >
            <option value="">Select Role</option>

            <option value="CUSTOMER">Customer</option>

            <option value="TECHNICIAN">Technician</option>
          </select>

          {errors.role && (
            <p className="text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading || isPending}
          className="w-full"
        >
          {loading || isPending ? "Creating..." : "Register"}
        </Button>
      </Card>
    </form>
  );
};

export default RegisterForm;
