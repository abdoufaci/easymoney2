import db from "@/lib/db";
import { VerificationStatus } from "@prisma/client";

export const getStudents = async (
  currentPage: number,
  studentsPerPage: number,
  searchParams: Record<string, string | undefined>
) => {
  let joinDateFrom: Date | null = null;
  let joinDateTo: Date | null = null;

  let dateOfBirthFrom: Date | null = null;
  let dateOfBirthTo: Date | null = null;

  if (searchParams.joinDateFrom) {
    joinDateFrom = new Date(searchParams.joinDateFrom);
  }

  if (searchParams.dateOfBirthFrom) {
    dateOfBirthFrom = new Date(searchParams.dateOfBirthFrom);
  }

  if (searchParams.joinDateTo) {
    joinDateTo = new Date(searchParams.joinDateTo);
  }

  if (searchParams.dateOfBirthTo) {
    dateOfBirthTo = new Date(searchParams.dateOfBirthTo);
  }

  return await db.user.findMany({
    where: {
      role: "USER",
      ...(searchParams.search && {
        OR: [
          {
            name: {
              contains: searchParams?.search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: searchParams?.search,
              mode: "insensitive",
            },
          },
          {
            country: {
              contains: searchParams?.search,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: searchParams?.search,
              mode: "insensitive",
            },
          },
          {
            studentNumber: {
              contains: searchParams?.search,
              mode: "insensitive",
            },
          },
        ],
      }),
      ...(searchParams?.country && {
        country: searchParams?.country,
      }),
      ...(searchParams?.status && {
        VerificationStatus: searchParams?.status as VerificationStatus,
      }),
      ...(joinDateFrom &&
        joinDateTo && {
          createdAt: {
            gte: joinDateFrom,
            lte: joinDateTo,
          },
        }),
      ...(dateOfBirthFrom &&
        dateOfBirthTo && {
          dateOfBirth: {
            gte: dateOfBirthFrom,
            lte: dateOfBirthTo,
          },
        }),
      ...(searchParams?.courses && {
        courses: {
          some: {
            id: {
              in: searchParams.courses.split(","),
            },
          },
        },
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: studentsPerPage * (currentPage - 1),
    take: studentsPerPage,
  });
};
