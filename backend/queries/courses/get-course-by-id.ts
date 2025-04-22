import { currentUser } from "@/lib/auth";
import db from "@/lib/db";

export const getCourseById = async (courseId: string) => {
  const user = await currentUser();

  const course = await db.course.findUnique({
    where: {
      id: courseId,
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
        orderBy: {
          createdAt: "asc",
        },
      },
      students: {
        where: {
          id: user?.id,
        },
      },
    },
  });

  return course;
};
