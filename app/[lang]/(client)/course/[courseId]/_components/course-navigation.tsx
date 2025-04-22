import { Video, VideoProgress } from "@prisma/client";
import VideoCard from "./video-card";
import { Dispatch, SetStateAction } from "react";

interface Props {
  videos: (Video & {
    progress: VideoProgress[];
  })[];
  selectedVideo: string;
  setSelectedVideo: Dispatch<SetStateAction<string>>;
}

function CourseNavigation({ videos, selectedVideo, setSelectedVideo }: Props) {
  return (
    <div className="space-y-5">
      <h1 className="text-lg">Course Content</h1>
      <div className="space-y-3">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            videoName={video.englishTitle}
            isCompleted={!!video.progress.length}
            isSelected={selectedVideo === video.videoId}
            onClick={() => setSelectedVideo(video.videoId)}
            videoId={video.id}
            progress={video.progress}
          />
        ))}
      </div>
    </div>
  );
}

export default CourseNavigation;
