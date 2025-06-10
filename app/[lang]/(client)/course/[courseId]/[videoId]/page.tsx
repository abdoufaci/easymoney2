import { getCourseById } from "@/backend/queries/courses/get-course-by-id";
import DashboardHeader from "@/components/dashboard-header";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import { redirect } from "next/navigation";
import CourseBody from "../_components/course-body";
import { getVideoById } from "@/backend/mutations/courses/get-video-by-id";

interface Props {
  params: {
    lang: string;
    courseId: string;
    videoId: string;
  };
}

async function VideoIdPage({ params: { courseId, lang, videoId } }: Props) {
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

  const video = await getVideoById(videoId);

  return (
    <div
      style={{
        backgroundImage: "url('/blur-bg.svg')",
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="min-h-screen">
      <DashboardHeader courseName={course?.englishTitle} />
      <CourseBody course={course} user={user} videoId={videoId} video={video} />
    </div>
  );
}

export default VideoIdPage;
