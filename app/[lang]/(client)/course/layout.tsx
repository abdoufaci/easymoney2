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
  return (
    <div
      style={{
        backgroundImage: "url('/blur-bg.svg')",
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}>
      {children}
    </div>
  );
}

export default CourseLayout;
