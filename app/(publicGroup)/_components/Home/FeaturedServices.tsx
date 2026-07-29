"use client";

import { Clock, MapPin, Star, User } from "lucide-react";

import { Button } from "@/components/ui/button";

type FeaturedService = {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;

  category: {
    name: string;
  };

  technician: {
    location: string;
    averageRating: number;
    totalReviews: number;

    user: {
      name: string;
    };
  };
};

interface FeaturedServicesProps {
  services: FeaturedService[];
}

const FeaturedServices = ({ services }: FeaturedServicesProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:w-7xl">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Services
            </h2>

            <p className="mt-2 text-gray-600">
              Popular services from trusted professionals
            </p>
          </div>

          <Button variant="outline">View All Services</Button>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="
                rounded-2xl
                border
                bg-white
                p-6
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >
              {/* Top */}
              <div className="flex items-center justify-between">
                <span
                  className="
                    rounded-full
                    bg-blue-100
                    px-3
                    py-1
                    text-sm
                    font-medium
                    text-blue-600
                  "
                >
                  {service.category.name}
                </span>

                <div className="flex items-center gap-1">
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />

                  <span className="font-semibold">
                    {service.technician.averageRating}
                  </span>
                </div>
              </div>

              {/* Service */}
              <h3
                className="
                  mt-5
                  text-xl
                  font-bold
                  text-gray-900
                "
              >
                {service.title}
              </h3>

              <p
                className="
                  mt-2
                  line-clamp-2
                  text-sm
                  text-gray-600
                "
              >
                {service.description}
              </p>

              {/* Technician */}
              <div className="mt-5 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <User size={16} />

                  <span>{service.technician.user.name}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={16} />

                  <span>{service.technician.location}</span>
                </div>
              </div>

              {/* Footer */}
              <div
                className="
                  mt-6
                  flex
                  items-center
                  justify-between
                  border-t
                  pt-4
                "
              >
                <div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock size={15} />
                    {service.duration} min
                  </div>

                  <p className="mt-1 text-lg font-bold text-gray-900">
                    ${service.price}
                  </p>
                </div>

                <Button>Book Now</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
