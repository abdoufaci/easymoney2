import {
  Building2,
  ChartLine,
  GraduationCap,
  Landmark,
  ListTodo,
  MessageCircleMore,
  School,
  MessageCircleQuestion,
  User2,
  UserRoundPen,
  UsersRound,
} from "lucide-react";

export const navigation = (dict: any) => [
  {
    title: dict.sidebar.dashboard,
    url: "/admin",
    icon: ChartLine,
  },
  {
    title: dict.sidebar.courses,
    url: "/admin/courses",
    icon: GraduationCap,
  },
  {
    title: dict.sidebar.testimonials,
    url: "/admin/testimonies",
    icon: UserRoundPen,
  },
  {
    title: dict.sidebar.directChat,
    url: "/admin/direct-chat",
    icon: MessageCircleQuestion,
  },
  {
    title: dict.sidebar.chat,
    url: "/admin/chat",
    icon: MessageCircleMore,
  },
  {
    title: dict.sidebar.followup,
    url: "/admin/followup",
    icon: UsersRound,
  },
  {
    title: dict.sidebar.students,
    url: "/admin/students",
    icon: School,
  },
  {
    title: dict.sidebar.payments,
    url: "/admin/payments",
    icon: Landmark,
  },
];
