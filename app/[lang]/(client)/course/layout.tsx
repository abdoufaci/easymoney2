import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EasyMoney University",
  description: "EasyMoney University",
  icons: {
    icon: "/icon.png",
    href: "/icon.png",
  },
};

interface Props {
  children: React.ReactNode;
}

function CourseLayout({ children }: Props) {
  return <div>{children}</div>;
}

export default CourseLayout;
