import { getStudentSections } from "@/backend/queries/courses/get-student-sections";
import StudentCourseCard from "./_components/student-course-card";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import Link from "next/link";

async function DashboardPage() {
  const sections = await getStudentSections();
  const u = await currentUser();
  const user = await getUserById(u?.id || "");

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section.id} className="space-y-5">
          <div className="flex items-center gap-5">
            <h1 className="text-lg font-medium">{section.title}</h1>
          </div>
          <div className="flex items-center gap-5">
            {section.courses.map((course) =>
              !!course.students.length ? (
                <Link key={course.id} href={`/course/${course.id}`}>
                  <StudentCourseCard course={course} user={user} />
                </Link>
              ) : (
                <StudentCourseCard
                  key={course.id}
                  course={course}
                  user={user}
                />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;
