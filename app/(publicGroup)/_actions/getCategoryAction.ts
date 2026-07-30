"use server";
export const getCategoryAction = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/category`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24, // 1 day
      tags: ["categories"],
    },
  });
  const result = await res.json();
  return result;
};
