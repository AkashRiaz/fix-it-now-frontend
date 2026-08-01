"use server";

import { AdminDashboardResponse } from "@/lib/type";
import { isAccessTokenExist } from "@/service/refreshToken";

const emptyDashboardResponse: AdminDashboardResponse = {
  success: false,
  statusCode: 500,
  message: "Unable to retrieve admin dashboard",
  data: {
    summary: {
      totalUsers: 0,
      totalCustomers: 0,
      totalTechnicians: 0,
      activeUsers: 0,
      activeBookings: 0,
      completedBookings: 0,
      totalRevenue: 0,
    },
    bookingStatusSummary: {
      requested: 0,
      accepted: 0,
      paid: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0,
      declined: 0,
    },
    paymentSummary: {
      completedPayments: 0,
      pendingPayments: 0,
      failedPayments: 0,
    },
    recentBookings: [],
    recentPayments: [],
    topTechnicians: [],
  },
};

export const getAdminDashboardAction =
  async (): Promise<AdminDashboardResponse> => {
    try {
      const accessToken = await isAccessTokenExist();

      if (!accessToken) {
        return {
          ...emptyDashboardResponse,
          statusCode: 401,
          message: "Admin not logged in",
        };
      }

      const response = await fetch(
        `${process.env.BACKEND_API_URL}/admin/dashboard`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken}`,
          },
          cache: "no-store",
        },
      );

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        return {
          ...emptyDashboardResponse,
          statusCode: response.status,
          message:
            result?.message ||
            "Failed to retrieve admin dashboard",
        };
      }

      return result;
    } catch (error) {
      console.error("Admin dashboard fetch error:", error);

      return emptyDashboardResponse;
    }
  };