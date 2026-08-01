import {
  BadgeCheckIcon,
  ClockIcon,
  MapPinIcon,
  SparklesIcon,
  StarIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ServiceFormDialog, {
  type ServiceCategory,
  type TechnicianService,
} from "./ServiceFormDialog";

type ServiceCardProps = {
  service: TechnicianService;
  categories: ServiceCategory[];
};

const ServiceCard = ({ service, categories }: ServiceCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="outline">
            {service.category?.name || "Uncategorized"}
          </Badge>

          {service.isFeatured && (
            <Badge>
              <SparklesIcon data-icon="inline-start" />
              Featured
            </Badge>
          )}
        </div>

        <CardTitle className="text-lg">{service.title}</CardTitle>

        <CardAction>
          <ServiceFormDialog
            mode="edit"
            service={service}
            categories={categories}
          />
        </CardAction>
      </CardHeader>

      <CardContent className="flex h-full flex-col space-y-4">
        <p className="line-clamp-3 whitespace-pre-line text-sm text-muted-foreground">
          {service.description || "No service description provided."}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">Price</p>

            <p className="mt-1 font-semibold">
              ৳{service.price.toLocaleString()}
            </p>
          </div>

          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">Duration</p>

            <p className="mt-1 flex items-center gap-1 font-semibold">
              <ClockIcon className="size-3.5" />
              {service.duration} min
            </p>
          </div>
        </div>

        <div className="space-y-2 border-t pt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPinIcon className="size-4" />

            <span>
              {service.technician?.location || "Location not provided"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <StarIcon className="size-4 fill-amber-400 text-amber-400" />

            <span>
              {service.technician?.averageRating?.toFixed(1) || "0.0"} (
              {service.technician?.totalReviews || 0} reviews)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <BadgeCheckIcon className="size-4 text-emerald-600" />

            <span>{service.technician?.user?.name || "Technician"}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
          <span>
            Created {new Date(service.createdAt).toLocaleDateString()}
          </span>

          <span>ID: {service.id.slice(0, 8)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
