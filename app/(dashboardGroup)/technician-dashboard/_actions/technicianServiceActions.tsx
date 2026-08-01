"use server";
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidatePath, revalidateTag } from "next/cache";

type ServiceActionResult = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: unknown;
};

export const createServiceAction = async (
  formData: FormData,
): Promise<ServiceActionResult> => {
  try {
    const title = formData.get("title")?.toString().trim() || "";

    const description = formData.get("description")?.toString().trim() || "";

    const price = Number(formData.get("price"));

    const duration = Number(formData.get("duration"));

    const categoryId = formData.get("categoryId")?.toString().trim() || "";

    if (!title) {
      return {
        success: false,
        message: "Title is required",
      };
    }

    if (!categoryId) {
      return {
        success: false,
        message: "Category is required",
      };
    }

    if (Number.isNaN(price) || price < 0) {
      return {
        success: false,
        message: "Price must be a valid number",
      };
    }

    if (Number.isNaN(duration) || duration <= 0) {
      return {
        success: false,
        message: "Duration must be greater than zero",
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
      title,
      description,
      price,
      duration,
      categoryId,
    };

    const response = await fetch(`${process.env.BACKEND_API_URL}/service`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || !result?.success) {
      return {
        success: false,
        statusCode: response.status,
        message: result?.message || "Failed to create service",
        data: result?.data,
      };
    }

    revalidateTag("technician-services", {
      expire: 0,
    });

    revalidateTag("services", {
      expire: 0,
    });

    revalidatePath("/technician-dashboard/services");

    return result;
  } catch (error) {
    console.error("Create service error:", error);

    return {
      success: false,
      message: "Unable to create service",
    };
  }
};

export const updateServiceAction = async (
  serviceId: string,
  formData: FormData,
): Promise<ServiceActionResult> => {
  try {
    const title = formData.get("title")?.toString().trim() || "";

    const description = formData.get("description")?.toString().trim() || "";

    const price = Number(formData.get("price"));

    const duration = Number(formData.get("duration"));

    const categoryId = formData.get("categoryId")?.toString().trim() || "";

    if (!serviceId) {
      return {
        success: false,
        message: "Service ID is required",
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
      title,
      description,
      price,
      duration,
      categoryId,
    };

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/service/${serviceId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await response.json();

    if (!response.ok || !result?.success) {
      return {
        success: false,
        statusCode: response.status,
        message: result?.message || "Failed to update service",
        data: result?.data,
      };
    }

    revalidateTag("technician-services", {
      expire: 0,
    });

    revalidateTag("services", {
      expire: 0,
    });

    revalidatePath("/technician-dashboard/services");

    return result;
  } catch (error) {
    console.error("Update service error:", error);

    return {
      success: false,
      message: "Unable to update service",
    };
  }
};

export const getTechnicianServices = async () => {
  try {
    const accessToken = await isAccessTokenExist();
    if (!accessToken) {
      return {
        success: false,
        message: "Technician not logged in",
        data: null,
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/service/technician-services`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "force-cache",
        next: {
          revalidate: 60 * 60 * 24,
          tags: ["technician-services"],
        },
      },
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching technician services:", error);
    return {
      success: false,
      message: "Failed to fetch technician services",
      data: null,
    };
  }
};
