// import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from "./utils/jwt";
import { cookies } from "next/headers";
import { getNewAccessToken } from "./service/refreshToken";

const AUTH_ROUTES = ["/login", "/register"];

const PUBLIC_ROUTES = ["/", "/services"];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const cookieStore = await cookies();

  // const accessToken = cookieStore.get('access_token')?.value;

  let accessToken = request.cookies.get("accessToken")?.value;
  // console.log(accessToken, "accessToken-----");
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  // console.log(decodedAccessToken, "decodedAccessToken");

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
      const result = await getNewAccessToken();

      if (result.success && result.data) {
        const newAccessToken = result.data.accessToken;
        // console.log(newAccessToken, "newAccessToken");
        cookieStore.set("accessToken", newAccessToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24, // 1 day
          sameSite: "lax",
        });

        accessToken = newAccessToken;
        decodedAccessToken = jwtUtils.verifyToken(
          accessToken!,
          process.env.JWT_ACCESS_SECRET as string,
        );
      }
    }

  let userRole = null;

  // console.log(decodedAccessToken?.success, "decodedAccessToken?.success");

  if (!decodedAccessToken?.success) {
    cookieStore.delete("accessToken");
  }

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  if (accessToken && AUTH_ROUTES.includes(pathName)) {
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else if (userRole === "TECHNICIAN") {
      return NextResponse.redirect(
        new URL("/technician-dashboard", request.url),
      );
    } else if (userRole === "CUSTOMER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

    const isPublicRoute = PUBLIC_ROUTES.some(
      (route) => pathName === route || pathName.startsWith(route + "/"),
    );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathName === route || pathName.startsWith(route + "/"),
  );

  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirectTo", pathName);

    return NextResponse.redirect(loginUrl);
  }

  if (pathName.startsWith("/dashboard") && userRole !== "CUSTOMER") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathName.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathName.startsWith("/technician-dashboard") &&
    userRole !== "TECHNICIAN"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  //   if (pathName === "/premium") {
  //     const subscriptionStatus = await getSubscriptionStatus();
  //     const isActive = Boolean(
  //       subscriptionStatus?.success && subscriptionStatus.data?.isSubscribed,
  //     );

  //     if (!isActive) {
  //       return NextResponse.redirect(new URL("/payment", request.url));
  //     }
  //   }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    // '/dashboard/:path*',
    // '/admin-dashboard/:path*',
    "/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)",
  ],
};
