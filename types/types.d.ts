import { Course, Section, Video, VideoProgress } from "@prisma/client";

export type CourseWithVideos = Course & {
  videos: Video[];
};

export type CourseWithVideosProgress = Course & {
  videos: (Video & {
    progress: VideoProgress[];
  })[];
  students: User[];
};

export type StudentSections = Section & {
  courses: CourseWithVideosProgress[];
};

export type SectionWithCourses = Section & {
  courses: CourseWithVideos[];
};
