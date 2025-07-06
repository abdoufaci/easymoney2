import db from "@/lib/db";

export const getTestimonyGroups = async () => {
  return await db.testimonyGroup.findMany({
    include: {
      testemonies: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};
