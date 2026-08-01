import { TopTechnician } from "@/lib/type";
import {
  BriefcaseBusiness,
  MapPin,
  Star,
} from "lucide-react";

type TopTechniciansProps = {
  technicians?: TopTechnician[];
};

const TopTechnicians = ({
  technicians = [],
}: TopTechniciansProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Top Technicians
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Highest-rated professionals on the platform.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {technicians?.length > 0 ? (
          technicians.map((technician, index) => {
            const technicianName =
              technician?.user?.name || "Unknown Technician";

            const initials =
              technicianName
                .split(" ")
                .filter(Boolean)
                .map((word) => word.charAt(0))
                .join("")
                .slice(0, 2)
                .toUpperCase() || "T";

            return (
              <article
                key={technician?.id}
                className="flex items-center gap-3 rounded-xl border border-slate-200 p-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                  {initials}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-semibold text-slate-900">
                      {technicianName}
                    </h3>

                    <span className="text-xs font-semibold text-slate-400">
                      #{index + 1}
                    </span>
                  </div>

                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />

                      {Number(
                        technician?.averageRating ?? 0,
                      ).toFixed(1)}
                    </span>

                    <span>
                      {technician?.totalReviews ?? 0} reviews
                    </span>

                    <span className="flex items-center gap-1">
                      <BriefcaseBusiness className="h-3.5 w-3.5" />

                      {technician?.completedJobs ?? 0} jobs
                    </span>
                  </div>

                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5" />

                    {technician?.location ||
                      "Location not provided"}
                  </p>
                </div>
              </article>
            );
          })
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
            <p className="text-sm text-slate-500">
              No technician information found.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopTechnicians;