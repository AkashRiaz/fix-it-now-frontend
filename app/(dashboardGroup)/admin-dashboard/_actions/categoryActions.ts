"use server"
import { CategoryActionResult } from "@/lib/type";
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidatePath, revalidateTag } from "next/cache";

export const getAllCategories = async () => {
  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "Admin not logged in",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/admin/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
  });
  const result = await res.json();
  return result;
};

export const createCategoryAction = async (
  formData: FormData,
): Promise<CategoryActionResult> => {
  try {
    const name = formData.get("name")?.toString().trim() || "";

    if (!name) {
      return {
        success: false,
        message: "Category name is required",
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
      `${process.env.BACKEND_API_URL}/admin/category`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({
          name,
        }),
        cache: "no-store",
      },
    );

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      return {
        success: false,
        statusCode: response.status,
        message: result?.message || "Failed to create category",
        data: result?.data || null,
      };
    }

    revalidateTag("admin-categories", {
      expire: 0,
    });

    revalidateTag("categories", {
      expire: 0,
    });

    revalidatePath("/admin-dashboard/category");

    return {
      success: true,
      statusCode: result.statusCode || response.status,
      message: result.message || "Category created successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Create category error:", error);

    return {
      success: false,
      message: "Unable to create category",
    };
  }
};

export const updateCategoryAction = async (
  categoryId: string,
  formData: FormData,
): Promise<CategoryActionResult> => {
  try {
    const name = formData.get("name")?.toString().trim() || "";

    if (!categoryId) {
      return {
        success: false,
        message: "Category ID is required",
      };
    }

    if (!name) {
      return {
        success: false,
        message: "Category name is required",
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
      `${process.env.BACKEND_API_URL}/admin/category/${categoryId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({
          name,
        }),
        cache: "no-store",
      },
    );

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      return {
        success: false,
        statusCode: response.status,
        message: result?.message || "Failed to update category",
        data: result?.data || null,
      };
    }

    revalidateTag("admin-categories", {
      expire: 0,
    });

    revalidateTag("categories", {
      expire: 0,
    });

    revalidatePath("/admin-dashboard/category");

    return {
      success: true,
      statusCode: result.statusCode || response.status,
      message: result.message || "Category updated successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Update category error:", error);

    return {
      success: false,
      message: "Unable to update category",
    };
  }
};
