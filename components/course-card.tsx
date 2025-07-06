"use client";

import { Course, Video } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Clock2, VideoIcon } from "lucide-react";
import { truncate } from "@/lib/truncate";
import { useModal } from "@/hooks/useModalStore";
import { CourseWithVideos, SectionWithCourses } from "@/types/types";

interface Props {
  course: CourseWithVideos;
  section: SectionWithCourses;
}

function CourseCard({ course, section }: Props) {
  const { onOpen } = useModal();

  return (
    <div
      onClick={() => onOpen("editCourse", { course, section })}
      className="w-full max-w-sm rounded-md bg-gradient-to-b from-[#40414F]/35 to-[#1B1B1F]/35 cursor-pointer">
      <Image
        alt="course"
        src={
          //@ts-ignore
          `https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME}/${course.image?.id}`
        }
        height={500}
        width={500}
        className="w-full h-64 rounded-t-md"
      />
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <VideoIcon className="h-5 w-5 text-brand" />
              <h1 className="text-sm">{course.videos.length}</h1>
            </div>
            <Button
              variant={course.isActive ? "active" : "hidden"}
              className="rounded-full p-0 px-4 h-6"
              size={"sm"}>
              {course.isActive ? "Active" : "Hidden"}
            </Button>
          </div>
          <h1 className="text-brand font-medium text-sm">
            {course.priceInEuro} $ / {course.priceInDa} da
          </h1>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">{course.englishTitle}</h1>
          <p className="text-[#CCCCCC]">{truncate(course.englishDesc, 80)}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
