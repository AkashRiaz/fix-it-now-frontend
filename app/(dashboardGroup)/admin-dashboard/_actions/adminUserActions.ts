"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { isAccessTokenExist } from "@/service/refreshToken";
import { AdminUserListResponse } from "@/lib/type";

type UserQuery = {
  searchTerm?: string | string[];
  page?: string | string[];
  limit?: string | string[];
};

const getQueryValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0] || "";
  }

  return value || "";
};

export const getAdminUsersAction = async ({
  query,
}: {
  query?: UserQuery;
}): Promise<AdminUserListResponse> => {
  try {
    const params = new URLSearchParams();

    const searchTerm = getQueryValue(query?.searchTerm);

    const page = getQueryValue(query?.page);

    const limit = getQueryValue(query?.limit);

    if (searchTerm) {
      params.set("searchTerm", searchTerm);
    }

    if (page) {
      params.set("page", page);
    }

    if (limit) {
      params.set("limit", limit);
    }

    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Admin not logged in",
        meta: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
        data: [],
      };
    }

    const queryString = params.toString();

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/admin/users${
        queryString ? `?${queryString}` : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "force-cache",
        next: {
          revalidate: 60 * 60,
          tags: ["admin-users"],
        },
      },
    );

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      return {
        success: false,
        statusCode: response.status,
        message: result?.message || "Failed to retrieve users",
        meta: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
        data: [],
      };
    }

    return result;
  } catch (error) {
    console.error("Get admin users error:", error);

    return {
      success: false,
      statusCode: 500,
      message: "Unable to retrieve users",
      meta: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      },
      data: [],
    };
  }
};

type UserStatus = "ACTIVE" | "BLOCKED";

type UserStatusActionState = {
  success: boolean;
  message: string;
  data?: unknown;
};

export const updateUserStatusAction = async (
  previousState: UserStatusActionState | null,
  formData: FormData,
): Promise<UserStatusActionState> => {
  try {
    const userId = formData.get("userId")?.toString().trim() || "";

    const status = formData.get("status")?.toString().trim() || "";

    if (!userId) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    if (status !== "ACTIVE" && status !== "BLOCKED") {
      return {
        success: false,
        message: "Invalid user status",
      };
    }

    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "Admin not logged in",
      };
    }

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/admin/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({
          status: status as UserStatus,
        }),
        cache: "no-store",
      },
    );

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      return {
        success: false,
        message: result?.message || "Failed to update user status",
      };
    }

    revalidateTag("admin-users", {
      expire: 0,
    });

    revalidatePath("/admin-dashboard/users");

    return {
      success: true,
      message:
        result?.message ||
        (status === "ACTIVE"
          ? "User unbanned successfully"
          : "User banned successfully"),
      data: result?.data,
    };
  } catch (error) {
    console.error("Update user status error:", error);

    return {
      success: false,
      message: "Unable to update user status",
    };
  }
};
