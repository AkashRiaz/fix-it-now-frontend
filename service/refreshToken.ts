"use server";

import { cookies } from "next/headers";

import { jwtUtils } from "@/utils/jwt";

type RefreshTokenResponse = {
  success: boolean;
  message?: string;
  data?: {
    accessToken?: string;
  };
};

export const getNewAccessToken =
  async (): Promise<RefreshTokenResponse> => {
    try {
      const cookieStore = await cookies();

      const refreshToken =
        cookieStore.get("refreshToken")?.value;

      if (!refreshToken) {
        return {
          success: false,
          message: "No refresh token found",
        };
      }

      const response = await fetch(
        `${process.env.BACKEND_API_URL}/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `refreshToken=${refreshToken}`,
          },
          cache: "no-store",
        },
      );

      const result = await response
        .json()
        .catch(() => null);

      if (!response.ok || !result?.success) {
        return {
          success: false,
          message:
            result?.message ||
            "Failed to refresh access token",
        };
      }

      return result;
    } catch (error) {
      console.error(
        "Get new access token error:",
        error,
      );

      return {
        success: false,
        message: "Unable to refresh access token",
      };
    }
  };

export const isAccessTokenExist =
  async (): Promise<string | null> => {
    const cookieStore = await cookies();

    let accessToken =
      cookieStore.get("accessToken")?.value || null;

    const refreshToken =
      cookieStore.get("refreshToken")?.value || null;

    // User has logged out or never logged in.
    if (!accessToken && !refreshToken) {
      return null;
    }

    const decodedAccessToken = accessToken
      ? jwtUtils.verifyToken(
          accessToken,
          process.env.JWT_ACCESS_SECRET as string,
        )
      : null;

    // Current access token is valid.
    if (decodedAccessToken?.success) {
      return accessToken;
    }

    const decodedRefreshToken = refreshToken
      ? jwtUtils.verifyToken(
          refreshToken,
          process.env.JWT_REFRESH_SECRET as string,
        )
      : null;

    // Access token is invalid/expired and refresh token is
    // also invalid/expired.
    if (!decodedRefreshToken?.success) {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");

      return null;
    }

    // Refresh token is valid, request a new access token.
    const result = await getNewAccessToken();

    const newAccessToken =
      result?.data?.accessToken;

    if (!result?.success || !newAccessToken) {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");

      return null;
    }

    cookieStore.set(
      "accessToken",
      newAccessToken,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      },
    );

    accessToken = newAccessToken;

    return accessToken;
  };