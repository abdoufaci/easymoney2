import db from "@/lib/db";

export const getStudents = async (
  currentPage: number,
  studentsPerPage: number,
  search?: string
) => {
  return await db.user.findMany({
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
    orderBy: {
      createdAt: "desc",
    },
    skip: studentsPerPage * (currentPage - 1),
    take: studentsPerPage,
  });
};
