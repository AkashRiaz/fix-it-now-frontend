"use server";
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidatePath } from "next/cache";

export const getTechnicianBookingsAction = async () => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_API_URL}/technician/bookings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
  });
  const result = await res.json();
  return result;
};


export type TechnicianBookingStatus =
  | "ACCEPTED"
  | "DECLINED"
  | "IN_PROGRESS"
  | "COMPLETED";

type UpdateBookingStatusResult = {
  success: boolean;
  message: string;
};

export const updateBookingStatusAction = async (
  bookingId: string,
  status: TechnicianBookingStatus,
): Promise<UpdateBookingStatusResult> => {
  try {
    const accessToken = await isAccessTokenExist();

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/technician/bookings/${bookingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({ status }),
        cache: "no-store",
      },
    );

    const result = await res.json();

    if (!res.ok || !result?.success) {
      return {
        success: false,
        message: result?.message || "Failed to update booking status.",
      };
    }

    revalidatePath("/technician-dashboard/technician/bookings");

    return {
      success: true,
      message: result.message || "Booking status updated successfully.",
    };
  } catch (error) {
    console.error("Update booking status error:", error);

    return {
      success: false,
      message: "Unable to update booking status.",
    };
  }
};