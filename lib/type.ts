import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
    status: "ACTIVE" | "INACTIVE";
    createdAt: string;
    updatedAt: string;

    technicianProfile?: {
      id: string;
      userId: string;
      bio: string | null;
      experience: string;
      location: string;
      hourlyRate: number | null;
      averageRating: number;
      totalReviews: number;
      completedJobs: number;
      createdAt: string;
      updatedAt: string;

      availability: {
        id: string;
        technicianId: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        createdAt: string;
        updatedAt: string;
      }[];
    } | null;
  };
};

export type NavbarProps = {
  user: IUser;
};

export type ISidebarItem = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export interface IService {
  id: string;

  title: string;

  description: string;

  price: number;

  duration: number;

  isFeatured: boolean;

  technicianId: string;

  categoryId: string;

  createdAt: string;

  updatedAt: string;

  category: {
    id: string;

    name: string;

    createdAt: string;

    updatedAt: string;
  };

  technician: {
    id: string;

    userId: string;

    bio: string | null;

    experience: string;

    location: string;

    hourlyRate: number | null;

    averageRating: number;

    totalReviews: number;

    completedJobs: number;

    createdAt: string;

    updatedAt: string;

    user: {
      id: string;

      name: string;

      email: string;

      phone: string;

      role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";

      status: "ACTIVE" | "INACTIVE";

      createdAt: string;

      updatedAt: string;
    };
  };
}
