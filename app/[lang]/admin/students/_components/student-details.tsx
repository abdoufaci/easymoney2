import { addStudentToCourse } from "@/backend/mutations/courses/add-student-to-course";
import { removeStudentFromCourse } from "@/backend/mutations/courses/remove-student-from-course";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CourseWithVideos, CourseWithVideosProgress } from "@/types/types";
import { User } from "@prisma/client";
import { format } from "date-fns";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  dict: any;
  student: User;
  courses: CourseWithVideosProgress[];
}

function StudentDetails({ dict, student, courses }: Props) {
  const [isPending, startTransition] = useTransition();

  const onCheck = async (courseId: string) => {
    startTransition(() => {
      addStudentToCourse(courseId, student.id)
        .then(() => toast.success("Student added to the course !"))
        .catch(() => toast.error("Something went wrong ."));
    });
  };

  const onDeCheck = async (courseId: string) => {
    startTransition(() => {
      removeStudentFromCourse(courseId, student.id)
        .then(() => toast.success("Student removed from the course !"))
        .catch(() => toast.error("Something went wrong ."));
    });
  };

  return (
    <ScrollArea className="h-[95vh]">
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 w-52 h-52 rounded-full bg-brand blur-xl opacity-70 -z-10"></div>
            <Image
              alt="avatar"
              src={
                //@ts-ignore
                student?.image?.url || ""
              }
              height={100}
              width={100}
              className="object-cover w-52 h-52 rounded-full border-[10px] border-[#1FB4AB0F] z-50"
            />
          </div>
          <div className="space-y-1 flex flex-col items-center">
            <h3 className="text-brand text-sm">4848747848</h3>
            <h1 className="text-2xl font-semibold">{student.name}</h1>
            <h3 className="text-brand">EM Student</h3>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold">Informations</h1>
            <SquarePen className="h-4 w-4 cursor-pointer" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C0BDBD]">Email</span>
            <h1>{student.email}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C0BDBD]">{dict.general.phoneNumber}</span>
            <h1>{student.phone}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C0BDBD]">{dict.general.JoinDate}</span>
            <h1>{format(student.createdAt, "dd/MM/yyyy")}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C0BDBD]">{dict.general.country}</span>
            <h1>{student.country}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C0BDBD]">{dict.general.city}</span>
            <h1>{student.city}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C0BDBD]">{dict.general.adress}</span>
            <h1>{student.adress}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C0BDBD]">{dict.general.zipCode}</span>
            <h1>{student.zipCode}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C0BDBD]">{dict.general.dateOfBirth}</span>
            <h1>{format(student?.dateOfBirth || new Date(), "dd/MM/yyyy")}</h1>
          </div>
        </div>
        <div className="space-y-4 w-full">
          <h1 className="text-lg font-semibold">Courses</h1>
          <div className="space-y-3">
            {courses.map((course) => (
              <div key={course.id} className="flex items-center gap-4">
                <Checkbox
                  disabled={isPending}
                  onCheckedChange={(e) =>
                    e ? onCheck(course.id) : onDeCheck(course.id)
                  }
                  checked={
                    !!course.students.filter((item) => item.id === student.id)
                      .length
                  }
                  className="rounded-full data-[state=checked]:text-white data-[state=checked]:bg-brand data-[state=checked]:border-none"
                />
                <h1>{course.englishTitle}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

export default StudentDetails;
