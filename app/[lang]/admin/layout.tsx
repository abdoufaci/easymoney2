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
      }}
      className="p-8 space-x-10">
      <AppSidebar dict={dict} />
      <SidebarInset
        className={poppins.className}
        style={{
          backgroundColor: "transparent",
        }}>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
