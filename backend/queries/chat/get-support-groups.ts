import db from "@/lib/db";

export const getSupportGroups = async () => {
  return await db.supportGroup.findMany({
    where: {
      user: {
        groups: {
          some: {
            status: {
              not: "CLOSED",
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      user: true,
      messages: true,
    },
  });
};
