import type { ReactNode } from "react";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  Star,
  UserRound,
} from "lucide-react";

import { UpdateTechnicianProfileDialog } from "./UpdateTechnicianProfileDialog";

type Availability = {
  id: string;
  technicianId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

type TechnicianProfile = {
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
  availability: Availability[];
};

type TechnicianData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  technicianProfile?: TechnicianProfile | null;
};

type TechnicianProfileResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: TechnicianData;
};

interface TechnicianProfileIndexProps {
  profileData: TechnicianProfileResponse;
}

const daysOfWeek: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const formatTime = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

const TechnicianProfileIndex = ({
  profileData,
}: TechnicianProfileIndexProps) => {
  const technicianData = profileData?.data;

  const technicianProfile = technicianData?.technicianProfile;

  if (!technicianData) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <p className="text-sm text-slate-500">
          Technician profile data was not found.
        </p>
      </div>
    );
  }

  const { name, email, phone, role, status, createdAt } = technicianData;

  const formattedJoinedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  const initials =
    name
      ?.split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "T";

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <UpdateTechnicianProfileDialog profileData={technicianProfile} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="relative h-40 bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 sm:h-52">
          <span className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
            {role}
          </span>
        </div>

        <div className="relative px-5 pb-7 sm:px-8">
          <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-3xl font-bold text-white shadow-md sm:h-36 sm:w-36 sm:text-4xl">
                {initials}

                <span
                  className={`absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-white ${
                    status === "ACTIVE" ? "bg-emerald-500" : "bg-slate-400"
                  }`}
                />
              </div>

              <div className="pb-2 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  {name}
                </h1>

                <p className="mt-1 text-sm text-slate-500">{email}</p>
              </div>
            </div>

            <span
              className={`mb-2 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                status === "ACTIVE"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-slate-100 text-slate-600"
              }`}
            >
              <BadgeCheck className="h-4 w-4" />
              {status}
            </span>
          </div>

          <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Professional Bio
            </h2>

            <p className="text-sm leading-6 text-slate-700">
              {technicianProfile?.bio || "No professional bio has been added."}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ProfileInfoCard
              icon={<BriefcaseBusiness className="h-5 w-5" />}
              label="Experience"
              value={technicianProfile?.experience || "Not provided"}
            />

            <ProfileInfoCard
              icon={<MapPin className="h-5 w-5" />}
              label="Location"
              value={technicianProfile?.location || "Not provided"}
            />

            <ProfileInfoCard
              icon={<DollarSign className="h-5 w-5" />}
              label="Hourly Rate"
              value={
                technicianProfile?.hourlyRate != null
                  ? `৳${technicianProfile.hourlyRate.toLocaleString()}`
                  : "Not provided"
              }
            />

            <ProfileInfoCard
              icon={<CalendarDays className="h-5 w-5" />}
              label="Joined"
              value={formattedJoinedDate}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatisticCard
          label="Average Rating"
          value={(technicianProfile?.averageRating || 0).toFixed(1)}
          icon={<Star className="h-5 w-5 fill-amber-400 text-amber-400" />}
        />

        <StatisticCard
          label="Total Reviews"
          value={String(technicianProfile?.totalReviews || 0)}
          icon={<UserRound className="h-5 w-5 text-indigo-600" />}
        />

        <StatisticCard
          label="Completed Jobs"
          value={String(technicianProfile?.completedJobs || 0)}
          icon={<BriefcaseBusiness className="h-5 w-5 text-emerald-600" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Contact Information
          </h2>

          <div className="mt-5 space-y-4">
            <ContactItem
              icon={<Mail className="h-5 w-5" />}
              label="Email"
              value={email}
            />

            <ContactItem
              icon={<Phone className="h-5 w-5" />}
              label="Phone"
              value={phone || "Not provided"}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Availability
            </h2>

            <Clock3 className="h-5 w-5 text-slate-400" />
          </div>

          <div className="mt-5 space-y-3">
            {technicianProfile?.availability?.length ? (
              technicianProfile.availability.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="text-sm font-medium text-slate-700">
                    {daysOfWeek[item.dayOfWeek] || "Unknown day"}
                  </span>

                  <span className="text-sm text-slate-500">
                    {formatTime(item.startTime)} – {formatTime(item.endTime)}
                  </span>
                </div>
              ))
            ) : (
              <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                No availability has been added.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProfileInfoCardProps {
  icon: ReactNode;
  label: string;
  value: string;
}

const ProfileInfoCard = ({ icon, label, value }: ProfileInfoCardProps) => (
  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
    <div className="rounded-lg bg-indigo-50 p-2.5 text-indigo-600">{icon}</div>

    <div className="min-w-0">
      <p className="text-xs font-medium text-slate-500">{label}</p>

      <p className="truncate text-sm font-semibold text-slate-800">{value}</p>
    </div>
  </div>
);

interface StatisticCardProps {
  label: string;
  value: string;
  icon: ReactNode;
}

const StatisticCard = ({ label, value, icon }: StatisticCardProps) => (
  <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div>
      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>

    <div className="rounded-xl bg-slate-50 p-3">{icon}</div>
  </div>
);

interface ContactItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

const ContactItem = ({ icon, label, value }: ContactItemProps) => (
  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
    <div className="text-indigo-600">{icon}</div>

    <div className="min-w-0">
      <p className="text-xs text-slate-500">{label}</p>

      <p className="truncate text-sm font-medium text-slate-800">{value}</p>
    </div>
  </div>
);

export default TechnicianProfileIndex;
