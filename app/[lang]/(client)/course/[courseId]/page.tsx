import { getCourseById } from "@/backend/queries/courses/get-course-by-id";
import DashboardHeader from "@/components/dashboard-header";
import CourseBody from "./_components/course-body";
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

  return (
    <div
      style={{
        backgroundImage: "url('/blur-bg.svg')",
      }}
      className="min-h-screen">
      <DashboardHeader courseName={course?.englishTitle} />
      <CourseBody course={course} />
    </div>
  );
}

export default CoursePage;
