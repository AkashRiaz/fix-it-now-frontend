"use server";

import { revalidatePath } from "next/cache";
import { isAccessTokenExist } from "@/service/refreshToken";

type CreateReviewResult = {
  success: boolean;
  message: string;
};

export const createReviewAction = async (
  formData: FormData,
): Promise<CreateReviewResult> => {
  try {
    const bookingId = formData.get("bookingId")?.toString().trim();

    const ratingValue = formData.get("rating")?.toString().trim();

    const comment = formData.get("comment")?.toString().trim() || "";

    const rating = Number(ratingValue);

    if (!bookingId) {
      return {
        success: false,
        message: "Booking ID is required.",
      };
    }

    if (!ratingValue || Number.isNaN(rating)) {
      return {
        success: false,
        message: "Rating is required.",
      };
    }

    if (rating < 1 || rating > 5) {
      return {
        success: false,
        message: "Rating must be between 1 and 5.",
      };
    }

    if (comment.length > 1000) {
      return {
        success: false,
        message: "Review comment cannot exceed 1000 characters.",
      };
    }

    const accessToken = await isAccessTokenExist();

    const response = await fetch(`${process.env.BACKEND_API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({
        bookingId,
        rating,
        comment: comment || null,
      }),
      cache: "no-store",
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      return {
        success: false,
        message: result?.message || "Failed to submit review.",
      };
    }

    revalidatePath("/dashboard/bookings");

    return {
      success: true,
      message: result?.message || "Review submitted successfully.",
    };
  } catch (error) {
    console.error("Create review error:", error);

    return {
      success: false,
      message: "Unable to submit review.",
    };
  }
};
