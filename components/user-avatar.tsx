"use client";

import { ExtendedUser } from "@/types/next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { BadgeCheck, LogOut } from "lucide-react";
import Link from "next/link";
import { logout } from "@/backend/auth-actions/logout";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateSession } from "@/backend/mutations/users/update-session";

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
                src={
                  user?.image?.id
                    ? `https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME}/${user.image.id}`
                    : user?.image || ""
                }
                className="object-cover"
              />
              <AvatarFallback className="bg-brand/10 cursor-pointer">
                {user?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-1 hidden md:!block">
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-sm">{user?.name}</h1>
              {user?.role === "USER" && user?.isVerified && (
                <BadgeCheck className="fill-[#1FB4AB] text-black h-4 w-4" />
              )}
            </div>
            <h3 className="text-brand text-sm">
              {user?.role === "ADMIN" ? "Admin" : "EM Student"}
            </h3>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            href={
              user?.role === "USER"
                ? "/dashboard/settings"
                : "/dashboard/settings"
            }>
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isPending}
          onClick={() =>
            startTransition(() => {
              logout().then(async () => {
                await updateSession(user?.id || "");
                router.push("/");
              });
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
