import { Button } from "@/components/ui/button";
import { Course, User, Video, VideoProgress } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { cn } from "@/lib/utils";
import { Expand, Minimize } from "lucide-react";

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
  user?: User | null;
}

function CourseVideo({ course, selectedVideo, setSelectedVideo, user }: Props) {
  const indexOfSelectedVideo = course?.videos.findIndex(
    (item) => item.videoId === selectedVideo
  );
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const player = new Player(iframeRef.current!);

    // Show text every 60 seconds (real time)
    const interval = setInterval(() => {
      setShowText(true);
      setTimeout(() => setShowText(false), 3000); // Hide after 3s
    }, 60000); // Every 1 minute

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative w-full transition-all duration-300 space-y-4 aspect-video",
        isFullscreen ? "fixed top-0 left-0 w-screen h-screen bg-black z-50" : ""
      )}>
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${selectedVideo}?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=${process.env.NEXT_PUBLIC_VIMEO_APP_ID}`}
        width="1920"
        height="1080"
        allow="autoplay; clipboard-write; encrypted-media"
        style={{
          backgroundColor: "black !important",
        }}
        className="w-full h-full bg-black!"></iframe>
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

      {showText && (
        <div className="absolute top-0 right-16  flex items-center justify-center z-10 pointer-events-none">
          <p className="text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded-lg">
            {user?.studentNumber}
          </p>
        </div>
      )}
      <Button
        onClick={() => setIsFullscreen(!isFullscreen)}
        variant={"expand"}
        className="absolute top-0 right-2 z-20 rounded p-0 px-3">
        {isFullscreen ? (
          <Minimize
            onClick={() => setIsFullscreen(!isFullscreen)}
            className=" w-5 h-5"
          />
        ) : (
          <Expand
            onClick={() => setIsFullscreen(!isFullscreen)}
            className=" w-5 h-5"
          />
        )}
      </Button>
    </div>
  );
}

export default CourseVideo;
