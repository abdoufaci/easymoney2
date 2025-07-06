import db from "@/lib/db";
import { getMonthDates } from "@/lib/get-months-date";

export const getThisMonthAnalytics = async () => {
  const {
    currentMonth: { firstDay, lastDay },
  } = getMonthDates();

  const activeUsers = await db.user.count({
    where: {
      updatedAt: {
        gte: firstDay,
        lte: lastDay,
      },
    },
  });

  const signUps = await db.user.count({
    where: {
      createdAt: {
        gte: firstDay,
        lte: lastDay,
      },
    },
  });

  const students = await db.user.count({
    where: {
      becomeStudent: {
        gte: firstDay,
        lte: lastDay,
      },
    },
  });

  return {
    activeUsers,
    students,
    signUps,
  };
};
