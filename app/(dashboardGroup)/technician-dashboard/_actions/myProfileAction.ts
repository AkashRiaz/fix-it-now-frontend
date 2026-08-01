"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { isAccessTokenExist } from "@/service/refreshToken";

export type UpdateTechnicianProfileState = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: unknown;
};

export const updateTechnicianProfileAction = async (
  formData: FormData,
): Promise<UpdateTechnicianProfileState> => {
  try {
    const bio = formData.get("bio")?.toString().trim() || "";
    const experience = formData.get("experience")?.toString().trim() || "";
    const location = formData.get("location")?.toString().trim() || "";
    const hourlyRateValue = formData.get("hourlyRate")?.toString().trim() || "";

    const profilePhoto = formData.get("profilePhoto")?.toString().trim() || "";

    if (hourlyRateValue && Number.isNaN(Number(hourlyRateValue))) {
      return {
        success: false,
        message: "Hourly rate must be a valid number",
      };
    }

    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "Technician not logged in",
      };
    }

    const payload = {
      bio,
      experience,
      location,
      hourlyRate: hourlyRateValue ? Number(hourlyRateValue) : 0,
      profilePhoto,
    };

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/technician/profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      return {
        success: false,
        statusCode: response.status,
        message: result?.message || "Failed to update technician profile",
        data: result?.data,
      };
    }

    revalidateTag("my-profile", {
      expire: 0,
    });

    revalidatePath("/technician-dashboard/technician/profile");

    return {
      success: true,
      statusCode: result.statusCode || response.status,
      message: result.message || "Technician profile updated successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Technician profile update error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
