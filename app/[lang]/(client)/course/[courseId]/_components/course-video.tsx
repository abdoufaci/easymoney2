import { Button } from "@/components/ui/button";
import { Course, User, Video, VideoProgress } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { cn } from "@/lib/utils";
import { Expand, Minimize } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  course:
    | (Course & {
        videos: (Video & {
          progress: VideoProgress[];
        })[];
      })
    | null;
  user?: User | null;
  video: {
    otp: any;
    playbackInfo: any;
  };
  videoId: string;
}

function CourseVideo({ course, video, videoId }: Props) {
  const indexOfSelectedVideo = course?.videos.findIndex(
    (item) => item.videoId === videoId
  );

  const router = useRouter();

  return (
    <div
      className={cn(
        "relative w-full transition-all duration-300 space-y-4 aspect-video"
      )}>
      <iframe
        src={`https://player.vdocipher.com/v2/?otp=${video.otp}&playbackInfo=${video.playbackInfo}`}
        style={{ border: 0 }}
        allowFullScreen={true}
        allow="encrypted-media"
        className="w-full h-full aspect-video"></iframe>
      <div className="flex items-center justify-between gap-5">
        <Button
          onClick={() =>
            router.push(
              //@ts-ignore
              `/course/${course?.videos[indexOfSelectedVideo - 1].courseId}/${
                //@ts-ignore
                course?.videos[indexOfSelectedVideo - 1].videoId
              }`
            )
          }
          disabled={indexOfSelectedVideo === 0}
          variant={"whiteOutline"}
          className="rounded-full w-32 h-9">
          Previous
        </Button>
        <Button
          onClick={() =>
            router.push(
              //@ts-ignore
              `/course/${course?.videos[indexOfSelectedVideo + 1].courseId}/${
                //@ts-ignore
                course?.videos[indexOfSelectedVideo + 1].videoId
              }`
            )
          }
          disabled={indexOfSelectedVideo === (course?.videos.length || 0) - 1}
          variant={"brand"}
          className="rounded-full w-32 h-9">
          Next
        </Button>
      </div>
    </div>
  );
}

export default CourseVideo;
