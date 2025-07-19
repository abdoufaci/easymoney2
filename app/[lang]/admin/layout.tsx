import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getDictionary } from "../dictionaries";
import { poppins } from "@/app/fonts";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { TvIcon } from "lucide-react";

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
  params: {
    lang: string;
  };
}

export default async function RootLayout({
  children,
  params: { lang },
}: Props) {
  const dict = await getDictionary(lang);
  const auth = await currentUser();
  const user = await getUserById(auth?.id || "");

  if (!user) {
    redirect("/auth/login");
  }

  if (!user?.isActive) {
    redirect("/auth/activate");
  }

  if (user.role === "USER") {
    redirect("/");
  }

  return (
    <SidebarProvider
      style={{
        backgroundImage: "url('/blur-bg.svg')",
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
      className="p-8 space-x-10">
      <AppSidebar dict={dict} />
      <SidebarInset
        className={poppins.className}
        style={{
          backgroundColor: "transparent",
        }}>
        <div className=" md:!hidden w-full flex justify-end sticky top-0 left-0 bg-black py-5">
          <SidebarTrigger />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
