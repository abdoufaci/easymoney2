"use client";

import { ExtendedUser } from "@/types/next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { logout } from "@/backend/auth-actions/logout";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface Props {
  user?: ExtendedUser;
}

function UserAvatar({ user }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-4 cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 w-12 h-12 rounded-full bg-brand blur-xl opacity-70"></div>
            <Avatar className="border-2 border-[#1FB4AB70] h-12 w-12">
              <AvatarImage
                src={user?.image.url || ""}
                className="object-cover"
              />
              <AvatarFallback className="bg-brand/10 cursor-pointer">
                {user?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-1">
            <h1 className="font-semibold text-sm">{user?.name}</h1>
            <h3 className="text-brand text-sm">
              {user?.role === "ADMIN" ? "Admin" : "EM Student"}
            </h3>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            href={user?.role === "USER" ? "/dashboard/settings" : "/settings"}>
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isPending}
          onClick={() =>
            startTransition(() => {
              logout().then(() => router.push("/"));
            })
          }
          className="bg-[#FF00000F] text-[#FF0000] hover:!text-[#FF0000] hover:!bg-[#FF00000F] focus-within:bg-[#FF00000F] cursor-pointer">
          <LogOut className="h-4 w-4" />
          <h1>Logout</h1>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserAvatar;
