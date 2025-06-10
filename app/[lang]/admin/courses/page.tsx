import { getAdminSections } from "@/backend/queries/courses/get-admin-sections";
import AddSectionButton from "./_components/add-section-button";
import AddCourseButton from "./_components/add-course-button";
import CourseCard from "@/components/course-card";

async function CoursesPage() {
  const sections = await getAdminSections();

  return (
    <div className="space-y-7">
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} className="space-y-5">
            <div className="flex items-center gap-5">
              <h1 className="text-lg font-medium">{section.title}</h1>
              <AddCourseButton section={section} />
            </div>
            <div className="flex flex-wrap items-center gap-5">
              {section.courses.map((course) => (
                <CourseCard key={course.id} course={course} section={section} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <AddSectionButton />
    </div>
  );
}

export default CoursesPage;
