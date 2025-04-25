import { getStudentSections } from "@/backend/queries/courses/get-student-sections";
import StudentCourseCard from "./_components/student-course-card";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import Link from "next/link";
import { getDictionary } from "../../dictionaries";

async function DashboardPage({ params }: any) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const sections = await getStudentSections();
  const auth = await currentUser();
  const user = await getUserById(auth?.id || "");

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section.id} className="space-y-5">
          <div className="flex items-center gap-5">
            <h1 className="text-lg font-medium">{section.title}</h1>
          </div>
          <div className="flex flex-wrap items-start gap-5">
            {section.courses.map((course) =>
              !!course.students.length ? (
                <Link key={course.id} href={`/course/${course.id}`}>
                  <StudentCourseCard
                    course={course}
                    user={user}
                    isArabic={lang === "ar"}
                    dict={dict}
                  />
                </Link>
              ) : (
                <StudentCourseCard
                  key={course.id}
                  course={course}
                  user={user}
                  isArabic={lang === "ar"}
                  dict={dict}
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
