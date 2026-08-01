"use server";

type TechnicianQuery = {
  searchTerm?: string | string[];
  location?: string | string[];
  status?: string | string[];
  minHourlyRate?: string | string[];
  maxHourlyRate?: string | string[];
  sortBy?: string | string[];
  sortOrder?: string | string[];
  page?: string | string[];
  limit?: string | string[];
};

export const getTechnicianAction = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/technician/${id}`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
    },

    cache: "force-cache",

    next: {
      revalidate: 60 * 60 * 24,
      tags: ["technician"],
    },
  });

  const result = await res.json();

  return result;
};



export const getAllTechniciansAction = async ({
  query,
}: {
  query?: TechnicianQuery;
}) => {
  const params = new URLSearchParams();

  if (query?.searchTerm) {
    params.set(
      "searchTerm",
      Array.isArray(query.searchTerm)
        ? query.searchTerm[0]
        : query.searchTerm,
    );
  }

  if (query?.location) {
    params.set(
      "location",
      Array.isArray(query.location)
        ? query.location[0]
        : query.location,
    );
  }

  if (query?.status) {
    params.set(
      "status",
      Array.isArray(query.status)
        ? query.status[0]
        : query.status,
    );
  }

  if (query?.minHourlyRate) {
    params.set(
      "minHourlyRate",
      Array.isArray(query.minHourlyRate)
        ? query.minHourlyRate[0]
        : query.minHourlyRate,
    );
  }

  if (query?.maxHourlyRate) {
    params.set(
      "maxHourlyRate",
      Array.isArray(query.maxHourlyRate)
        ? query.maxHourlyRate[0]
        : query.maxHourlyRate,
    );
  }

  if (query?.sortBy) {
    params.set(
      "sortBy",
      Array.isArray(query.sortBy)
        ? query.sortBy[0]
        : query.sortBy,
    );
  }

  if (query?.sortOrder) {
    params.set(
      "sortOrder",
      Array.isArray(query.sortOrder)
        ? query.sortOrder[0]
        : query.sortOrder,
    );
  }

  if (query?.page) {
    params.set(
      "page",
      Array.isArray(query.page)
        ? query.page[0]
        : query.page,
    );
  }

  if (query?.limit) {
    params.set(
      "limit",
      Array.isArray(query.limit)
        ? query.limit[0]
        : query.limit,
    );
  }

  const queryString = params.toString();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/technician${
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
        tags: ["technicians"],
      },
    },
  );

  const result = await res.json();

  return result;
};