import DashboardHeader from "@/components/dashboard-header";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
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

export default async function DashboardLayout({ children }: Props) {
  const auth = await currentUser();
  const user = await getUserById(auth?.id || "");

  if (!user) {
    redirect("/auth/login");
  }

  if (!user?.isActive) {
    redirect("/auth/activate");
  }

  return (
    <div
      style={{
        backgroundImage: "url('/blur-bg.svg')",
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="min-h-screen">
      <DashboardHeader />
      <div className="px-10">{children}</div>
    </div>
  );
}
