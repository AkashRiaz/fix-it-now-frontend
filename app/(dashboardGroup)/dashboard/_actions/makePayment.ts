"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import { redirect } from "next/navigation";

export const makePayment = async (
  _: unknown,
  formData: FormData,
) => {
  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
    };
  }

  const bookingId = formData.get("bookingId")?.toString();

  if (!bookingId) {
    return {
      success: false,
      message: "Booking ID is required",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/payments/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({
        bookingId,
      }),
    },
  );

  const result = await res.json();

  if (result.success && result.data?.paymentUrl) {
    redirect(result.data.paymentUrl);
  }

  return result;
};