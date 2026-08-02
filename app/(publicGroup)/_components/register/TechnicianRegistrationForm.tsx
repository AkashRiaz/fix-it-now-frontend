"use client";

import {
  FormEvent,
  useActionState,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  Eye,
  EyeOff,
  LoaderCircle,
  MapPin,
  UserRoundCheck,
  Wrench,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  registerNewTechnicianAction,
  upgradeCustomerToTechnicianAction,
} from "../../_actions/technicianRegisterActions";

type PublicTechnicianFormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type TechnicianRegistrationFormProps = {
  isLoggedInCustomer: boolean;
  customerName?: string;
  customerEmail?: string;
};

const TechnicianRegistrationForm = ({
  isLoggedInCustomer,
  customerName,
  customerEmail,
}: TechnicianRegistrationFormProps) => {
  const router = useRouter();

  const [registrationState, registrationAction, registrationActionPending] =
    useActionState(registerNewTechnicianAction, null);

  const [registrationTransitionPending, startRegistrationTransition] =
    useTransition();

  const [upgradePending, startUpgradeTransition] = useTransition();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PublicTechnicianFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const registrationPending =
    registrationActionPending || registrationTransitionPending;

  useEffect(() => {
    if (!registrationState) {
      return;
    }

    if (registrationState.success) {
      toast.success(
        registrationState.message || "Technician registration successful",
      );

      router.push("/login");
      router.refresh();

      return;
    }

    toast.error(registrationState.message || "Technician registration failed");
  }, [registrationState, router]);

  const handlePublicRegistration = (values: PublicTechnicianFormValues) => {
    const formData = new FormData();

    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("phone", values.phone);
    formData.set("password", values.password);

    startRegistrationTransition(() => {
      registrationAction(formData);
    });
  };

  const handleCustomerUpgrade = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    startUpgradeTransition(async () => {
      try {
        const result = await upgradeCustomerToTechnicianAction(formData);

        if (!result.success) {
          toast.error(result.message || "Failed to create technician profile");

          return;
        }

        toast.success(
          result.message || "Technician profile created successfully",
        );

        router.push("/login");
        router.refresh();
      } catch (error) {
        console.error("Customer upgrade error:", error);

        toast.error(
          "Something went wrong while creating the technician profile",
        );
      }
    });
  };

  if (isLoggedInCustomer) {
    return (
      <Card className="overflow-hidden border-slate-200 shadow-lg">
        <CardHeader className="border-b bg-white">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <UserRoundCheck className="size-5" />
            </div>

            <div>
              <CardTitle>Upgrade Existing Account</CardTitle>

              <CardDescription className="mt-1">
                You are currently logged in as a customer. Your existing account
                will be converted into a technician account.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="rounded-xl border bg-slate-50 p-4">
            <p className="font-semibold text-slate-900">
              {customerName || "Customer"}
            </p>

            <p className="mt-1 text-sm text-slate-500">{customerEmail || ""}</p>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              Your name, email, phone, and password will remain unchanged. Only
              your role and technician profile will be updated.
            </p>
          </div>

          <form onSubmit={handleCustomerUpgrade} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>

              <Textarea
                id="bio"
                name="bio"
                placeholder="Describe your professional skills and services"
                className="min-h-28 resize-none"
                maxLength={1000}
                disabled={upgradePending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>

              <div className="relative">
                <BriefcaseBusiness className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="experience"
                  name="experience"
                  placeholder="Example: 3 years"
                  className="pl-9"
                  disabled={upgradePending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Service Location</Label>

              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="location"
                  name="location"
                  placeholder="Example: Dhaka, Bangladesh"
                  className="pl-9"
                  disabled={upgradePending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate</Label>

              <Input
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                min="0"
                step="1"
                placeholder="Example: 900"
                disabled={upgradePending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profilePhoto">Profile Photo URL</Label>

              <Input
                id="profilePhoto"
                name="profilePhoto"
                type="url"
                placeholder="https://example.com/photo.jpg"
                disabled={upgradePending}
              />
            </div>

            <Button type="submit" disabled={upgradePending} className="w-full">
              {upgradePending ? (
                <>
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                  Creating Profile...
                </>
              ) : (
                <>
                  <Wrench className="mr-2 size-4" />
                  Become a Technician
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-slate-200 shadow-lg">
      <CardHeader className="border-b bg-white">
        <CardTitle>Technician Registration</CardTitle>

        <CardDescription>
          Create a new technician account and start offering services.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <form
          onSubmit={handleSubmit(handlePublicRegistration)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>

            <Input
              id="name"
              placeholder="Enter your full name"
              disabled={registrationPending}
              {...register("name", {
                required: "Name is required",
              })}
            />

            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              disabled={registrationPending}
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>

            <Input
              id="phone"
              placeholder="Enter your phone number"
              disabled={registrationPending}
              {...register("phone", {
                required: "Phone number is required",
              })}
            />

            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="pr-10"
                disabled={registrationPending}
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
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>

            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="pr-10"
                disabled={registrationPending}
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((current) => !current)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm font-medium text-slate-800">Account Role</p>

            <div className="mt-2 flex items-center gap-2 text-primary">
              <Wrench className="size-4" />

              <span className="font-semibold">Technician</span>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              The role is fixed for this registration page.
            </p>
          </div>

          <Button
            type="submit"
            disabled={registrationPending}
            className="w-full"
          >
            {registrationPending ? (
              <>
                <LoaderCircle className="mr-2 size-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Register as Technician"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TechnicianRegistrationForm;
