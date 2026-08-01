"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import type { CreateBookingPayload, CreateBookingResult } from "@/lib/type";
import { isAccessTokenExist } from "@/service/refreshToken";

export const createBookingAction = async (
  payload: CreateBookingPayload,
): Promise<CreateBookingResult> => {
  try {
    if (
      !payload.slotStart ||
      !payload.slotEnd ||
      !payload.serviceId ||
      !payload.customerAddress?.trim()
    ) {
      return {
        success: false,
        message: "Date, time, service and address are required",
      };
    }

    const slotStart = new Date(payload.slotStart);

    const slotEnd = new Date(payload.slotEnd);

    if (Number.isNaN(slotStart.getTime()) || Number.isNaN(slotEnd.getTime())) {
      return {
        success: false,
        message: "Invalid booking date or time",
      };
    }

    if (slotStart >= slotEnd) {
      return {
        success: false,
        message: "End time must be after start time",
      };
    }

    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Please log in before creating a booking",
      };
    }

    const response = await fetch(`${process.env.BACKEND_API_URL}/booking`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Cookie: `accessToken=${accessToken}`,
      },

      body: JSON.stringify({
        slotStart: payload.slotStart,

        slotEnd: payload.slotEnd,

        notes: payload.notes?.trim() || "",

        customerAddress: payload.customerAddress.trim(),

        serviceId: payload.serviceId,
      }),

      cache: "no-store",
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      return {
        success: false,
        statusCode: response.status,

        message: result?.message || "Failed to create booking",

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

      message: result?.message || "Booking request submitted successfully",

      data: result?.data,
    };
  } catch (error) {
    console.error("Create booking action error:", error);

    return {
      success: false,
      message: "Something went wrong while creating the booking",
    };
  }
};
