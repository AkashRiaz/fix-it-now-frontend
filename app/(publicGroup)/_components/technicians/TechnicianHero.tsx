/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Quote,
  Star,
  UserRound,
} from "lucide-react";

type TechnicianReview = {
  id: string;
  rating: number;
  comment: string | null;
  customerId: string;
  technicianId: string;
  bookingId: string;
  createdAt: string;
  updatedAt: string;

  customer?: {
    id: string;
    name: string;
    email?: string | null;
    phone?: string | null;
  };
};

type TechnicianHeroProps = {
  technician: {
    id: string;
    userId: string;
    bio: string | null;
    profilePhoto: string | null;
    experience: string | null;
    location: string | null;
    hourlyRate: number | null;
    averageRating: number;
    totalReviews: number;
    completedJobs: number;
    createdAt: string;
    updatedAt: string;

    user?: {
      id?: string;
      name?: string;
      email?: string;
      phone?: string;
      status?: "ACTIVE" | "BLOCKED";
    };

    reviews?: TechnicianReview[];
  };
};

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getInitials = (name?: string) => {
  return (
    name
      ?.split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "T"
  );
};

const RatingStars = ({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) => {
  const roundedRating = Math.round(Number(rating || 0));

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const isFilled = index < roundedRating;

        return (
          <Star
            key={index}
            size={size}
            className={
              isFilled
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-100 text-slate-300"
            }
          />
        );
      })}
    </div>
  );
};

export function TechnicianHero({ technician }: TechnicianHeroProps) {
  const technicianName = technician?.user?.name || "Unknown Technician";

  const initials = getInitials(technicianName);

  const reviews = technician?.reviews ?? [];

  const isActive = technician?.user?.status !== "BLOCKED";

  return (
    <div className="space-y-8">
      {/* Main profile hero */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Cover */}
        <div className="relative h-40 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 sm:h-52">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_35%)]" />

          <div className="absolute right-5 top-5">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur ${
                isActive
                  ? "border-emerald-300/30 bg-emerald-500/20 text-emerald-100"
                  : "border-rose-300/30 bg-rose-500/20 text-rose-100"
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              {isActive ? "Available Technician" : "Unavailable"}
            </span>
          </div>
        </div>

        <div className="relative px-5 pb-8 sm:px-8">
          {/* Profile header */}
          <div className="-mt-16 flex flex-col gap-5 sm:-mt-20 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white bg-primary/10 shadow-lg sm:h-40 sm:w-40">
                {technician?.profilePhoto ? (
                  <Image
                    src={technician.profilePhoto}
                    alt={`${technicianName} profile photo`}
                    fill
                    sizes="(max-width: 640px) 128px, 160px"
                    className="object-cover"
                    unoptimized
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary text-4xl font-bold text-white">
                    {initials}
                  </div>
                )}

                <span
                  className={`absolute bottom-2 right-2 z-10 h-5 w-5 rounded-full border-2 border-white ${
                    isActive ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                />
              </div>

              <div className="pb-2 text-center sm:text-left">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  {technicianName}
                </h1>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                  <div className="flex items-center gap-2">
                    <RatingStars rating={technician.averageRating} size={17} />

                    <span className="text-sm font-semibold text-slate-900">
                      {Number(technician.averageRating || 0).toFixed(1)}
                    </span>
                  </div>

                  <span className="text-sm text-slate-500">
                    {technician.totalReviews || 0} reviews
                  </span>
                </div>
              </div>
            </div>

            <div className="pb-2 text-center sm:text-right">
              <p className="text-sm text-slate-500">Hourly rate</p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {technician.hourlyRate != null
                  ? `$${technician.hourlyRate.toLocaleString()}`
                  : "Not set"}
              </p>
            </div>
          </div>

          {/* Quick information */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <ProfileDetail
              icon={<BriefcaseBusiness className="h-5 w-5" />}
              label="Experience"
              value={technician.experience || "Not provided"}
            />

            <ProfileDetail
              icon={<MapPin className="h-5 w-5" />}
              label="Location"
              value={technician.location || "Not provided"}
            />

            <ProfileDetail
              icon={<CheckCircle2 className="h-5 w-5" />}
              label="Completed Jobs"
              value={`${technician.completedJobs || 0} jobs`}
            />
          </div>

          {/* Bio */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-sm font-semibold text-slate-900">
              About this technician
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              {technician.bio || "No professional bio has been provided yet."}
            </p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Customer Reviews
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Feedback from customers who booked this technician.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
            <div>
              <p className="text-3xl font-bold text-slate-900">
                {Number(technician.averageRating || 0).toFixed(1)}
              </p>

              <p className="text-xs text-slate-500">out of 5</p>
            </div>

            <div>
              <RatingStars rating={technician.averageRating} size={18} />

              <p className="mt-1 text-xs text-slate-500">
                Based on {technician.totalReviews || 0} reviews
              </p>
            </div>
          </div>
        </div>

        {reviews.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {reviews.map((review) => {
              const customerName = review.customer?.name || "Verified Customer";

              const customerInitials =
                customerName
                  .split(" ")
                  .filter(Boolean)
                  .map((part) => part.charAt(0))
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "C";

              return (
                <article
                  key={review.id}
                  className="relative rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-primary/30 hover:bg-white hover:shadow-sm"
                >
                  <Quote className="absolute right-5 top-5 h-7 w-7 text-slate-200" />

                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {customerInitials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {customerName}
                          </p>

                          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {formatDate(review.createdAt)}
                          </p>
                        </div>

                        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                          Verified booking
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <RatingStars rating={review.rating} size={16} />

                        <span className="text-xs font-medium text-slate-500">
                          {Number(review.rating || 0).toFixed(1)}
                        </span>
                      </div>

                      <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-600">
                        {review.comment ||
                          "The customer left a rating without a written comment."}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
            <Star className="mx-auto h-10 w-10 text-slate-300" />

            <h3 className="mt-4 font-semibold text-slate-900">
              No reviews yet
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Customer reviews will appear here after completed bookings.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

type ProfileDetailProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const ProfileDetail = ({ icon, label, value }: ProfileDetailProps) => {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="rounded-xl bg-primary/10 p-3 text-primary">{icon}</div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500">{label}</p>

        <p className="mt-1 truncate text-sm font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
};
