import { Button } from "@/components/ui/button";
import { Course, Video, VideoProgress } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface Props {
  course:
    | (Course & {
        videos: (Video & {
          progress: VideoProgress[];
        })[];
      })
    | null;
  selectedVideo: string;
  setSelectedVideo: Dispatch<SetStateAction<string>>;
}

function CourseVideo({ course, selectedVideo, setSelectedVideo }: Props) {
  const indexOfSelectedVideo = course?.videos.findIndex(
    (item) => item.videoId === selectedVideo
  );

  return (
    <div className="space-y-4">
      <iframe
        src={`https://player.vimeo.com/video/${selectedVideo}?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=${process.env.NEXT_PUBLIC_VIMEO_APP_ID}`}
        width="1920"
        height="1080"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        className="w-full h-[500px]"></iframe>
      <div className="flex items-center justify-between gap-5">
        <Button
          onClick={() =>
            //@ts-ignore
            setSelectedVideo(course?.videos[indexOfSelectedVideo - 1].videoId)
          }
          disabled={indexOfSelectedVideo === 0}
          variant={"whiteOutline"}
          className="rounded-full w-32 h-9">
          Previous
        </Button>
        <Button
          onClick={() =>
            //@ts-ignore
            setSelectedVideo(course?.videos[indexOfSelectedVideo + 1].videoId)
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
