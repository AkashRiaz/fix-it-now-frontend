"use client";

import {
  Star,
  MapPin,
  BriefcaseBusiness,
  CheckCircle,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type Technician = {
  id: string;
  bio: string;
  experience: string;
  location: string;
  hourlyRate: number | null;
  averageRating: number;
  totalReviews: number;
  completedJobs: number;

  user: {
    name: string;
  };
};

interface TopTechniciansSectionProps {
  technicians: Technician[];
}

const TopTechniciansSection = ({ technicians }: TopTechniciansSectionProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Top Technicians</h2>

          <p className="mt-2 text-gray-600">
            Meet our highest rated service professionals
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {technicians?.map((technician) => (
            <div
              key={technician?.id}
              className="
                rounded-2xl
                border
                bg-white
                p-6
                text-center
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >
                
              {/* Avatar */}
              <div
                className="
                  mx-auto
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-100
                  text-blue-600
                "
              >
                <User size={38} />
              </div>

              {/* Name */}
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                {technician?.user?.name}
              </h3>

              {/* Rating */}
              <div
                className="
                  mt-2
                  flex
                  justify-center
                  items-center
                  gap-1
                "
              >
                <Star size={18} className="fill-yellow-400 text-yellow-400" />

                <span className="font-semibold">
                  {technician?.averageRating || "New"}
                </span>

                <span className="text-sm text-gray-500">
                  ({technician?.totalReviews} reviews)
                </span>
              </div>

              {/* Details */}
              <div
                className="
                  mt-5
                  space-y-3
                  text-sm
                  text-gray-600
                "
              >
                <div className="flex items-center justify-center gap-2">
                  <BriefcaseBusiness size={16} />

                  <span>{technician?.experience}</span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <MapPin size={16} />

                  <span>{technician?.location}</span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <CheckCircle size={16} />

                  <span>{technician?.completedJobs} Jobs Completed</span>
                </div>
              </div>

              {/* Price */}
              <div className="mt-5">
                <p className="text-sm text-gray-500">Starting from</p>

                <p className="text-xl font-bold text-gray-900">
                  {technician?.hourlyRate
                    ? `$${technician?.hourlyRate}/hr`
                    : "Contact for price"}
                </p>
              </div>

              {/* Button */}
              <Button className="mt-5 w-full">View Profile</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopTechniciansSection;
