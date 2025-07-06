import {
  Comment,
  Course,
  DirectGroup,
  DirectMessage,
  Group,
  GroupMessage,
  Payment,
  Section,
  SupportGroup,
  SupportMessage,
  Testimony,
  TestimonyGroup,
  User,
  Video,
  VideoProgress,
} from "@prisma/client";

export type TestimonyGroupWithTestimonies = TestimonyGroup & {
  testemonies: Testimony[];
};

export type GroupedUserByCourse = {
  englishTitle: string;
  _count: {
    students: number;
  };
};

export type GroupedUserByCountries = {
  country: string | null;
  _count: number;
};

export type GroupedChartData = {
  year: number;
  data: { month: string; total: number }[];
};

export type PaymentWithUserWithCourses = Payment & {
  user: User;
  courses: Course[];
};

export type SectionWithCourseWithVideosProgress = Section & {
  courses: CourseWithVideosProgress[];
};

export type DirectGroupWithMessages = DirectGroup & {
  user: User;
  messages: DirectMessage[];
};

export type SupportGroupWithMessages = SupportGroup & {
  user: User;
  messages: SupportMessage[];
};

export type GroupMessageWithUser = GroupMessage & {
  user: User;
};

export type DirectMessageWithUser = DirectMessage & {
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

export type CommentWithUserAndRepliesAndReactors = Comment & {
  user: User;
  _count: { replies: number };
  reactors: User[];
};

export type CourseWithVideosAndProgressAndComments = Course & {
  videos: (Video & {
    progress: VideoProgress[];
    comments: (Comment & {
      user: User;

      _count: { replies: number };
      reactors: User[];
    })[];
  })[];
  students: User[];
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
