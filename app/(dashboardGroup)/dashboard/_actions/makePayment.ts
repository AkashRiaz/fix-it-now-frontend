"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import { redirect } from "next/navigation";

export const makePayment = async () => {
  const accessToken = await isAccessTokenExist();
  if (!accessToken) {
    // throw new Error("User not logged in");
    return {
      success: false,
      message: "User not logged in",
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
    },
  );

  const result = await res.json();

  if (result.success && result.data?.paymentUrl) {
    redirect(result.data.paymentUrl);
  }
};
