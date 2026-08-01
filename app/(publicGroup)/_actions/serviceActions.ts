"use server";

type ServiceQuery = {
  [key: string]: string | string[] | undefined;
};

const getQueryValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0] || "";
  }

  return value || "";
};

export const getServiceAction = async ({ query }: { query?: ServiceQuery }) => {
  const params = new URLSearchParams();

  const searchTerm = getQueryValue(query?.searchTerm);

  const category = getQueryValue(query?.category);

  const location = getQueryValue(query?.location);

  const rating = getQueryValue(query?.rating);

  const minPrice = getQueryValue(query?.minPrice);

  const maxPrice = getQueryValue(query?.maxPrice);

  const sortBy = getQueryValue(query?.sortBy);

  const sortOrder = getQueryValue(query?.sortOrder);

  const page = getQueryValue(query?.page);

  const limit = getQueryValue(query?.limit);

  if (searchTerm) {
    params.set("searchTerm", searchTerm);
  }

  if (category) {
    params.set("category", category);
  }

  if (location) {
    params.set("location", location);
  }

  if (rating) {
    params.set("rating", rating);
  }

  if (minPrice) {
    params.set("minPrice", minPrice);
  }

  if (maxPrice) {
    params.set("maxPrice", maxPrice);
  }

  if (sortBy) {
    params.set("sortBy", sortBy);
  }

  if (sortOrder) {
    params.set("sortOrder", sortOrder);
  }

  if (page) {
    params.set("page", page);
  }

  if (limit) {
    params.set("limit", limit);
  }

  const queryString = params.toString();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/service${
      queryString ? `?${queryString}` : ""
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["services"],
      },
    },
  );

  const result = await res.json();

  return result;
};
