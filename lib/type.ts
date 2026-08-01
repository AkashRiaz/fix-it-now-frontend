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

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "DECLINED";

export type TechnicianService = {
  id: string;
  title: string;
  description: string | null;
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
      role: "TECHNICIAN";
      status: "ACTIVE" | "INACTIVE";
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type TechnicianServicesResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: TechnicianService[];
};


export type TechnicianStatus = "ACTIVE" | "INACTIVE";

export type TechnicianRole =
  | "CUSTOMER"
  | "TECHNICIAN"
  | "ADMIN";

export type TechnicianUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: TechnicianRole;
  status: TechnicianStatus;
  createdAt: string;
  updatedAt: string;
};

export type TechnicianAvailability = {
  id: string;
  technicianId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type TechnicianReview = {
  id: string;
  rating: number;
  comment: string | null;
  customerId: string;
  technicianId: string;
  bookingId: string;
  createdAt: string;
  updatedAt: string;
};

export type Technician = {
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
  user: TechnicianUser;
  availability: TechnicianAvailability[];
  reviews: TechnicianReview[];
};

export type TechnicianListMeta = {
  page: number;
  limit: number;
  total: number;
};

export type TechnicianListResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  meta: TechnicianListMeta;
  data: Technician[];
};