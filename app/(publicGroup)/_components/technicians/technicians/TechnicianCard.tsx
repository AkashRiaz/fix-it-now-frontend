"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  MapPin,
  Star,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Technician } from "@/lib/type";

type TechnicianCardProps = {
  technician: Technician;
};

const TechnicianCard = ({
  technician,
}: TechnicianCardProps) => {
  const technicianName =
    technician.user?.name || "Unknown Technician";

  const initials =
    technicianName
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "T";

  const rating = Number(
    technician.averageRating || 0,
  ).toFixed(1);

  const isAvailable =
    technician.availability?.length > 0;

  const isActive =
    technician.user?.status === "ACTIVE";

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white bg-primary/10 shadow-sm">
          {technician.profilePhoto ? (
            <Image
              src={technician.profilePhoto}
              alt={`${technicianName}'s profile photo`}
              fill
              sizes="64px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-bold text-primary">
              {initials}
            </div>
          )}

          <span
            className={`absolute bottom-0.5 right-0.5 z-10 h-3.5 w-3.5 rounded-full border-2 border-white ${
              isActive
                ? "bg-emerald-500"
                : "bg-rose-500"
            }`}
            title={`Status: ${technician.user?.status}`}
          />
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${
            isActive
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          {technician.user?.status || "UNKNOWN"}
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-bold text-slate-900">
          {technicianName}
        </h3>

        <div className="mt-2 flex items-center gap-1">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

          <span className="text-sm font-semibold text-slate-800">
            {rating}
          </span>

          <span className="text-sm text-slate-500">
            ({technician.totalReviews || 0} reviews)
          </span>
        </div>
      </div>

      <p className="mt-4 line-clamp-3 min-h-[72px] text-sm leading-6 text-slate-600">
        {technician.bio ||
          "No professional bio has been provided."}
      </p>

      <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <BriefcaseBusiness className="h-4 w-4 text-primary" />

          <span>
            {technician.experience ||
              "Experience not provided"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="h-4 w-4 text-primary" />

          <span>
            {technician.location ||
              "Location not provided"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CalendarClock className="h-4 w-4 text-primary" />

          <span>
            {isAvailable
              ? `${technician.availability.length} availability schedule${
                  technician.availability.length > 1
                    ? "s"
                    : ""
                }`
              : "No availability added"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <UserRound className="h-4 w-4 text-primary" />

          <span>
            {technician.completedJobs || 0} completed jobs
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between rounded-xl bg-slate-50 p-4">
        <div>
          <p className="text-xs text-slate-500">
            Hourly rate
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900">
            {technician.hourlyRate != null
              ? `$${technician.hourlyRate.toLocaleString()}`
              : "Not set"}
          </p>
        </div>

        <span className="text-xs text-slate-500">
          per hour
        </span>
      </div>

      <Button asChild className="mt-5 w-full">
        <Link href={`/technicians/${technician.id}`}>
          View Profile
        </Link>
      </Button>
    </article>
  );
};

export default TechnicianCard;