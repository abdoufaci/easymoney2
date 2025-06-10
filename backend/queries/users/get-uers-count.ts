import db from "@/lib/db";

export const getUsersCount = async (search?: string) => {
  return await db.user.count({
    where: {
      role: "USER",
      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            country: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            studentNumber: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),
    },
  });
};
