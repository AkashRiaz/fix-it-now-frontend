/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star, MapPin } from "lucide-react";

export function TechnicianHero({ technician }: any) {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm">
      <h1 className=" text-3xl font-bold">Technician Profile</h1>

      <div className="mt-5">
        <h2 className=" text-2xl font-semibold">{technician.user?.name}</h2>

        <div className="mt-3 flex gap-2 items-center">
          <Star size={18} className="fill-yellow-400 text-yellow-400" />
          {technician.averageRating}({technician.totalReviews}
          reviews )
        </div>

        <div
          className="
mt-2
flex
gap-2
"
        >
          <MapPin size={18} />

          {technician.location}
        </div>
      </div>

      <p className="mt-5 text-muted-foreground">{technician.bio}</p>

      <div className="mt-5">
        Experience:
        <b>{technician.experience}</b>
      </div>
    </div>
  );
}
