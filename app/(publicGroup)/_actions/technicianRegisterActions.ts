"use server";

import { cookies } from "next/headers";

import { isAccessTokenExist } from "@/service/refreshToken";

export type TechnicianRegistrationState = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: unknown;
  accountType?: "NEW" | "UPGRADED";
};

export const registerNewTechnicianAction = async (
  previousState: TechnicianRegistrationState | null,
  formData: FormData,
): Promise<TechnicianRegistrationState> => {
  try {
    const name = formData.get("name")?.toString().trim() || "";

    const email = formData.get("email")?.toString().trim() || "";

    const password = formData.get("password")?.toString() || "";

    const phone = formData.get("phone")?.toString().trim() || "";

    if (!name || !email || !password || !phone) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          role: "TECHNICIAN",
        }),
        cache: "no-store",
      },
    );

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      return {
        success: false,
        statusCode: response.status,
        message: result?.message || "Failed to register technician",
      };
    }

    return {
      success: true,
      statusCode: result.statusCode || response.status,
      message: result.message || "Technician registration successful",
      data: result.data,
      accountType: "NEW",
    };
  } catch (error) {
    console.error("Technician registration error:", error);

    return {
      success: false,
      message: "Something went wrong during registration",
    };
  }
};

export const upgradeCustomerToTechnicianAction = async (
  formData: FormData,
): Promise<TechnicianRegistrationState> => {
  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Please log in first",
      };
    }

    const hourlyRateValue = formData.get("hourlyRate")?.toString().trim() || "";

    if (hourlyRateValue && Number.isNaN(Number(hourlyRateValue))) {
      return {
        success: false,
        message: "Hourly rate must be a valid number",
      };
    }

    const payload = {
      bio: formData.get("bio")?.toString().trim() || "",
      experience: formData.get("experience")?.toString().trim() || "",
      location: formData.get("location")?.toString().trim() || "",
      profilePhoto: formData.get("profilePhoto")?.toString().trim() || "",
      hourlyRate: hourlyRateValue ? Number(hourlyRateValue) : null,
    };

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/technician/register`,
      {
        method: "POST",
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
        message: result?.message || "Failed to create technician profile",
      };
    }

    /*
     * The old access token still contains role CUSTOMER.
     * Remove it so your refresh/login process can issue
     * a token containing the new TECHNICIAN role.
     */
    const cookieStore = await cookies();

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return {
      success: true,
      statusCode: result.statusCode || response.status,
      message:
        result.message ||
        "Technician profile created successfully. Please log in again.",
      data: result.data,
      accountType: "UPGRADED",
    };
  } catch (error) {
    console.error("Upgrade customer error:", error);

    return {
      success: false,
      message: "Something went wrong while creating technician profile",
    };
  }
};
