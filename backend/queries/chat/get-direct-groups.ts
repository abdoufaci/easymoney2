import db from "@/lib/db";

export const getDirectGroups = async () => {
  return await db.directGroup.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      user: true,
      messages: true,
    },
  });
};
