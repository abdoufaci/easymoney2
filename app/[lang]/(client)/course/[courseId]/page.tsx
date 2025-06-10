import { getCourseById } from "@/backend/queries/courses/get-course-by-id";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import { redirect } from "next/navigation";

interface Props {
  params: {
    lang: string;
    courseId: string;
  };
}

async function CoursePage({ params: { courseId, lang } }: Props) {
  const auth = await currentUser();
  const user = await getUserById(auth?.id || "");

  if (!user) {
    redirect("/auth/login");
  }

  if (!user?.isActive) {
    redirect("/auth/activate");
  }

  const course = await getCourseById(courseId);

  if (!course?.students.length) {
    redirect("/");
  }

  redirect(`/course/${courseId}/${course.videos[0].videoId}`);
}

export default CoursePage;
