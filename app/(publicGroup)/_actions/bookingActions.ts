/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/service/refreshToken";

interface CreateBookingPayload {
  bookingDate: string;
  notes?: string;
  customerAddress: string;
  serviceId: string;
}

export async function createBookingAction(payload: CreateBookingPayload) {
  const accessToken = await isAccessTokenExist();
  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to create booking",
    };
  }
}
