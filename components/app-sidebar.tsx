"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { navigation } from "@/constants/navigations";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavMain } from "./nav-main";
import { currentUser } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import UserAvatar from "./user-avatar";

interface Props {
  dict: any;
}

export function AppSidebar({
  dict,
  ...props
}: React.ComponentProps<typeof Sidebar> & Props) {
  const user = useCurrentUser();

  return (
    <Sidebar
      collapsible="icon"
      className="md:!block h-[90%] my-auto ml-10 rounded-2xl"
      {...props}>
      <SidebarHeader>
        <div className="flex flex-col items-start pl-5 justify-center gap-1">
          <Image
            alt="logo"
            src={"/logo.svg"}
            height={100}
            width={150}
            className="object-cover"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigation(dict)} />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <UserAvatar user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
