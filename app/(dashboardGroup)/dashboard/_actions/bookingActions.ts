"use server";
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidatePath, revalidateTag } from "next/cache";

type CancelBookingResult = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: unknown;
};

export const cancelBookingAction = async (
  bookingId: string,
): Promise<CancelBookingResult> => {
  try {
    if (!bookingId) {
      return {
        success: false,
        message: "Booking ID is required",
      };
    }

    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Customer not logged in",
      };
    }

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/booking/${bookingId}/cancel`,
      {
        method: "PATCH",
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
        message: result?.message || "Failed to cancel booking",
        data: result?.data,
      };
    }

    revalidateTag("customer-bookings", {
      expire: 0,
    });

    revalidateTag("technician-bookings", {
      expire: 0,
    });

    revalidateTag("admin-bookings", {
      expire: 0,
    });

    revalidatePath("/dashboard/bookings");
    revalidatePath("/technician-dashboard/bookings");
    revalidatePath("/admin-dashboard/bookings");

    return {
      success: true,
      statusCode: result?.statusCode || response.status,
      message: result?.message || "Booking cancelled successfully",
      data: result?.data,
    };
  } catch (error) {
    console.error("Cancel booking action error:", error);

    return {
      success: false,
      message: "Something went wrong while cancelling the booking",
    };
  }
};

export const getBookingsAction = async () => {
  const accessToken = await isAccessTokenExist();
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/booking`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch bookings",
    };
  }
};
