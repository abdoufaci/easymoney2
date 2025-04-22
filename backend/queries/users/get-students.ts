import db from "@/lib/db";

export const getStudents = async (
  currentPage: number,
  studentsPerPage: number
) => {
  return await db.user.findMany({
    where: {
      role: "USER",
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: studentsPerPage * (currentPage - 1),
    take: studentsPerPage,
  });
};
