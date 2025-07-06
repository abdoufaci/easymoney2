import db from "@/lib/db";

export const getUsersCountries = async () => {
  return await db.user.findMany({
    select: {
      country: true,
    },
    distinct: ["country"],
    where: {
      country: {
        not: null,
      },
    },
  });
};
