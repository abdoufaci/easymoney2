import db from "@/lib/db";
import { groupPriceByYearAndMonth } from "@/lib/group-price-by-year-month";

export const getGlobalAnalytics = async () => {
  const payments = await db.payment.findMany({
    select: {
      createdAt: true,
      price: true,
    },
  });

  const groupedUserByCountries = await db.user.groupBy({
    by: ["country"],
    _count: true,
    where: {
      country: { not: null },
    },
  });

  const studentsPerCourses = await db.course.findMany({
    select: {
      englishTitle: true,
      _count: {
        select: {
          students: true,
        },
      },
    },
  });

  const groupedPayments = groupPriceByYearAndMonth(payments);

  return {
    groupedUserByCountries,
    studentsPerCourses,
    groupedPayments,
  };
};
