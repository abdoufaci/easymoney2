import {
  Course,
  Group,
  GroupMessage,
  Section,
  SupportGroup,
  SupportMessage,
  User,
  Video,
  VideoProgress,
} from "@prisma/client";

export type SupportGroupWithMessages = SupportGroup & {
  user: User;
  messages: SupportMessage[];
};

export type GroupMessageWithUser = GroupMessage & {
  user: User;
};

export type SupportMessageWithUser = SupportMessage & {
  user: User;
};

export type GroupWithMembersWithMessages = Group & {
  members: User[];
  messages: (GroupMessage & {
    user: User;
  })[];
};

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
