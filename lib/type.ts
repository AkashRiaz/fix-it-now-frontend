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
