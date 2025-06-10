import {
  Building2,
  ChartLine,
  GraduationCap,
  Landmark,
  ListTodo,
  MessageCircleMore,
  School,
  Settings,
  User2,
  UsersRound,
} from "lucide-react";

export const navigation = (dict: any) => [
  {
    title: dict.sidebar.dashboard,
    url: "/",
    icon: ChartLine,
  },
  {
    title: dict.sidebar.courses,
    url: "/admin/courses",
    icon: GraduationCap,
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
    url: "/",
    icon: Landmark,
  },
];
