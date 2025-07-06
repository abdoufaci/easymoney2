import db from "@/lib/db";
import { PaymentStatus, VerificationStatus } from "@prisma/client";

export const getPaymentsCount = async (
  searchParams: Record<string, string | undefined>
) => {
  let dateFrom: Date | null = null;
  let dateTo: Date | null = null;

  if (searchParams?.dateFrom) {
    dateFrom = new Date(searchParams?.dateFrom);
  }

  if (searchParams?.dateTo) {
    dateTo = new Date(searchParams?.dateTo);
  }

  return await db.payment.count({
    where: {
      ...(searchParams?.search && {
        OR: [
          {
            user: {
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
            },
          },
          {
            courses: {
              some: {
                OR: [
                  {
                    englishTitle: {
                      contains: searchParams?.search,
                      mode: "insensitive",
                    },
                  },
                  {
                    arabicTitle: {
                      contains: searchParams?.search,
                      mode: "insensitive",
                    },
                  },
                ],
              },
            },
          },
        ],
      }),
      ...(searchParams?.status && {
        status: searchParams?.status as PaymentStatus,
      }),
      ...(searchParams?.price && {
        price: searchParams?.price,
      }),
      ...(dateFrom &&
        dateTo && {
          createdAt: {
            gte: dateFrom,
            lte: dateTo,
          },
        }),
    },
  });
};
