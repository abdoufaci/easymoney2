"use client";

import { Video, VideoProgress } from "@prisma/client";
import VideoCard from "./video-card";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  videos: (Video & {
    progress: VideoProgress[];
  })[];
  videoId: string;
}

function CourseNavigation({ videos, videoId }: Props) {
  const router = useRouter();

  return (
    <div className="space-y-5">
      <h1 className="text-lg">Course Content</h1>
      <div className="space-y-3">
        {videos.map((video) => (
          <Link
            key={video.id}
            href={`/course/${video.courseId}/${video.videoId}`}
            className="block">
            <VideoCard
              videoName={video.englishTitle}
              isCompleted={!!video.progress.length}
              isSelected={videoId === video.videoId}
              onClick={() => {}}
              videoId={video.id}
              progress={video.progress}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CourseNavigation;
