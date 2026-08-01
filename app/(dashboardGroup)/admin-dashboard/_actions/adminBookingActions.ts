"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import type { AdminBookingsResponse } from "@/lib/type";

export const getAdminBookingsAction =
  async (): Promise<AdminBookingsResponse> => {
    try {
      const accessToken = await isAccessTokenExist();

      if (!accessToken) {
        return {
          success: false,
          statusCode: 401,
          message: "Admin not logged in",
          data: [],
        };
      }

      const response = await fetch(
        `${process.env.BACKEND_API_URL}/admin/bookings`,
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
          success: false,
          statusCode: response.status,
          message: result?.message || "Failed to retrieve admin bookings",
          data: [],
        };
      }

      return result;
    } catch (error) {
      console.error("Get admin bookings error:", error);

      return {
        success: false,
        statusCode: 500,
        message: "Unable to retrieve bookings",
        data: [],
      };
    }
  };
