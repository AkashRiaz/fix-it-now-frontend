"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { isAccessTokenExist } from "@/service/refreshToken";
import type {
  AvailabilityActionResult,
  TechnicianAvailability,
} from "@/lib/type";

export const getTechnicianAvailabilityAction =
  async (): Promise<AvailabilityActionResult> => {
    try {
      const accessToken = await isAccessTokenExist();

      if (!accessToken) {
        return {
          success: false,
          statusCode: 401,
          message: "Technician not logged in",
          data: [],
        };
      }

      const response = await fetch(
        `${process.env.BACKEND_API_URL}/technician/availability`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken}`,
          },
          cache: "force-cache",
          next: {
            revalidate: 60 * 60,
            tags: ["technician-availability"],
          },
        },
      );

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        return {
          success: false,
          statusCode: response.status,
          message: result?.message || "Failed to retrieve availability",
          data: [],
        };
      }

      return result;
    } catch (error) {
      console.error("Get technician availability error:", error);

      return {
        success: false,
        statusCode: 500,
        message: "Unable to retrieve technician availability",
        data: [],
      };
    }
  };

export const updateTechnicianAvailabilityAction = async (
  payload: TechnicianAvailability[],
): Promise<AvailabilityActionResult> => {
  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Technician not logged in",
      };
    }

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/technician/availability`,
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
        message: result?.message || "Failed to update availability",
        data: result?.data,
      };
    }

    revalidateTag("technician-availability", {
      expire: 0,
    });

    revalidateTag("technicians", {
      expire: 0,
    });

    revalidateTag("technician", {
      expire: 0,
    });

    revalidateTag("services", {
      expire: 0,
    });

    revalidatePath("/technician-dashboard/availability");

    revalidatePath("/services");
    revalidatePath("/technicians");

    return result;
  } catch (error) {
    console.error("Update technician availability error:", error);

    return {
      success: false,
      statusCode: 500,
      message: "Unable to update technician availability",
    };
  }
};
