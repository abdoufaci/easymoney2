import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { CourseWithVideosAndProgressAndComments } from "@/types/types";

export const getCourseById = async (courseId: string) => {
  const user = await currentUser();
  let course: CourseWithVideosAndProgressAndComments | null;

  course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      videos: {
        include: {
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            where: {
              commentId: null,
            },
            include: {
              reactors: true,
              user: true,
              _count: {
                select: { replies: true },
              },
            },
          },
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
