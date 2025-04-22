import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { truncate } from "@/lib/truncate";
import { ExtendedUser } from "@/types/next-auth";
import { CourseWithVideosProgress } from "@/types/types";
import { User } from "@prisma/client";
import { Clock2, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  course: CourseWithVideosProgress;
  user: User | null;
}

function StudentCourseCard({ course, user }: Props) {
  const doneVideos = course?.videos.filter(
    (videos) => !!videos.progress.length
  ).length;

  const progress = Math.round((doneVideos / course.videos.length) * 100);

  return (
    <div className="w-full max-w-sm rounded-md bg-gradient-to-b from-[#40414F]/35 to-[#1B1B1F]/35">
      <Image
        alt="course"
        src={
          //@ts-ignore
          course?.image?.url || ""
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
            <div className="flex items-center gap-2">
              <Clock2 className="h-5 w-5 text-brand" />
              <h1 className="text-sm">{course.hours}</h1>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">{course.englishTitle}</h1>
          <p className="text-[#CCCCCC]">{truncate(course.englishDesc, 80)}</p>
          {!!course.students.length ? (
            <div className="space-y-1">
              <Progress value={progress} />
              <h1 className="text-brand">{progress}%</h1>
            </div>
          ) : (
            <Button className="radialGradient rounded-full text-white BuyCourseShadows p-0 px-7 h-8">
              Get with{" "}
              {user?.phone?.startsWith("+213")
                ? `${course.priceInDa} DA`
                : `${course.priceInEuro}$`}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentCourseCard;
