import { currentUser } from "@/lib/auth";
import db from "@/lib/db";

export const getStudentSections = async () => {
  const user = await currentUser();

  return await db.section.findMany({
    where: {
      courses: {
        some: {
          isActive: true,
        },
      },
    },
    include: {
      courses: {
        where: {
          isActive: true,
        },
        include: {
          videos: {
            include: {
              progress: {
                where: {
                  userId: user?.id,
                },
              },
            },
          },
          students: {
            where: {
              id: user?.role === "USER" ? user?.id : undefined,
            },
          },
        },
      },
    },
  });
};
