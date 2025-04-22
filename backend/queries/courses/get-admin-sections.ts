import db from "@/lib/db";

export const getAdminSections = async () => {
  return await db.section.findMany({
    include: {
      courses: {
        include: {
          videos: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
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
