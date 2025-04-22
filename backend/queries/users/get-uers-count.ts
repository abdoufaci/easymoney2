import db from "@/lib/db";

export const getUsersCount = async () => {
  return await db.user.count({
    where: {
      role: "USER",
    },
  });
};
