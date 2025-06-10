import React from "react";
import StudentDashboard from "./_components/students-dashboard";
import { getDictionary } from "../../dictionaries";
import { getStudents } from "@/backend/queries/users/get-students";
import { getUsersCount } from "@/backend/queries/users/get-uers-count";
import { getAdminSections } from "@/backend/queries/courses/get-admin-sections";
import { getStudentSections } from "@/backend/queries/courses/get-student-sections";

async function StudentsPage({
  searchParams,
  params,
}: {
  searchParams: Record<string, string | string[] | undefined>;
  params: any;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const currentPage = searchParams.page;
  const search = searchParams.search;
  const studentsPerPage = 8;
  const students = await getStudents(
    Number(currentPage || "1"),
    studentsPerPage,
    search ? String(search) : undefined
  );
  const totalStudents = await getUsersCount(
    search ? String(search) : undefined
  );
  const sections = await getStudentSections();

  return (
    <div className="">
      <StudentDashboard
        currentPage={Number(currentPage || "1")}
        dict={dict}
        students={students}
        studentsPerPage={studentsPerPage}
        totalStudents={totalStudents}
        courses={sections.flatMap((s) => s.courses)}
        search={search}
      />
    </div>
  );
}

export default StudentsPage;
