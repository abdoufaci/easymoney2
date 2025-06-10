import db from "@/lib/db";

export const getSupportGroups = async () => {
  return await db.supportGroup.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      user: true,
      messages: true,
    },
  });
};
