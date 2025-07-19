import db from "@/lib/db";

export const getAllCourses = async () => {
  const courses = await db.course.findMany({
    select: {
      id: true,
      englishTitle: true,
    },
  });

  return courses.map((course) => ({
    label: course.englishTitle,
    value: course.id,
  }));
};
