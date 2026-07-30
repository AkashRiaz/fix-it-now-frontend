import { Clock, MapPin, Star } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { IService } from "@/lib/type";

export function ServiceCard({ service }: { service: IService }) {
  return (
    <div
      className="
        group
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
      {/* Category + Rating */}
      <div className="flex items-center justify-between">
        <span
          className="
            rounded-full
            bg-primary/10
            px-3
            py-1
            text-sm
            font-medium
            text-primary
          "
        >
          {service.category.name}
        </span>

        <div
          className="
            flex
            items-center
            gap-1
          "
        >
          <Star
            size={16}
            className="
              fill-yellow-400
              text-yellow-400
            "
          />

          <span className="text-sm font-semibold">
            {service.technician.averageRating || 0}
          </span>
        </div>
      </div>

      {/* Title */}
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

      {/* Description */}
      <p
        className="
          mt-2
          line-clamp-2
          text-sm
          text-muted-foreground
        "
      >
        {service.description}
      </p>

      {/* Technician Info */}
      <div
        className="
          mt-5
          space-y-3
          text-sm
          text-gray-600
        "
      >
        <p>👨‍🔧 {service.technician.user.name}</p>

        <div className="flex items-center gap-2">
          <MapPin size={15} />

          <span>{service.technician.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={15} />

          <span>{service.duration} minutes</span>
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
          <p className="text-xs text-muted-foreground">Starting from</p>

          <p
            className="
              text-xl
              font-bold
            "
          >
            ${service.price}
          </p>
        </div>

        <Link href={`/services/${service.id}`}>
          <Button>View Details</Button>
        </Link>
      </div>
    </div>
  );
}
