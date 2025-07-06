"use client";

import { Course, User, Video, VideoProgress } from "@prisma/client";
import { useState } from "react";
import CourseVideo from "./course-video";
import CourseNavigation from "./course-navigation";
import { CourseWithVideosAndProgressAndComments } from "@/types/types";
import CommentHeader from "../[videoId]/_components/comments/comment-header";
import CommentCard from "../[videoId]/_components/comments/comment-card";

interface Props {
  course: CourseWithVideosAndProgressAndComments | null;
  user?: User | null;
  videoId: string;
  video: {
    otp: any;
    playbackInfo: any;
  };
}

function CourseBody({ course, user, videoId, video }: Props) {
  const [commentToReply, setCommentToReply] = useState<string>("");

  return (
    <div className="grid grid-cols-1 md:!grid-cols-[60%_40%] gap-20 md:!gap-7 px-10 pb-20">
      <div className="space-y-10">
        <CourseVideo
          course={course}
          video={video}
          user={user}
          videoId={videoId}
        />
        {/* <div className="space-y-1">
          <h1 className="text-xl font-semibold">
            {course?.videos.find((v) => v.id === videoId)?.comments.length}{" "}
            Comments
          </h1>
          <div className="space-y-5">
            <CommentHeader
              videoId={videoId}
              onReply={() => setCommentToReply("")}
              RefetchReplies={() => {}}
            />
            <div className="space-y-5">
              {course?.videos
                .find((v) => v.id === videoId)
                ?.comments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={comment}
                    onClickReply={(commentId) => {
                      setCommentToReply(commentId);
                    }}
                    onReply={() => setCommentToReply("")}
                    showReplyHeader={(commentId) =>
                      commentToReply === commentId
                    }
                    RefetchReplies={() => {}}
                  />
                ))}
            </div>
          </div>
        </div> */}
      </div>
      <CourseNavigation videos={course?.videos || []} videoId={videoId} />
    </div>
  );
}

export default CourseBody;
