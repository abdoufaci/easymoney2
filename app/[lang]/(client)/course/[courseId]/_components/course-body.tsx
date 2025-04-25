"use client";

import { Course, User, Video, VideoProgress } from "@prisma/client";
import { useState } from "react";
import CourseVideo from "./course-video";
import CourseNavigation from "./course-navigation";

interface Props {
  course:
    | (Course & {
        videos: (Video & {
          progress: VideoProgress[];
        })[];
      })
    | null;
  user?: User | null;
}

function CourseBody({ course, user }: Props) {
  const [selectedVideo, setSelectedVideo] = useState(
    course?.videos[0].videoId || ""
  );

  return (
    <div className="grid grid-cols-1 md:!grid-cols-[60%_40%] gap-20 md:!gap-7 px-10">
      <CourseVideo
        course={course}
        selectedVideo={selectedVideo}
        setSelectedVideo={setSelectedVideo}
        user={user}
      />
      <CourseNavigation
        videos={course?.videos || []}
        selectedVideo={selectedVideo}
        setSelectedVideo={setSelectedVideo}
      />
    </div>
  );
}

export default CourseBody;
