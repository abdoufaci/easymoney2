import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { currentUser } from "@/lib/auth";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import UserAvatar from "./user-avatar";
import Link from "next/link";
import { getStudentChat } from "@/backend/queries/direct-chat/get-student-chat";
import SupportSheet from "./chat/support-sheet";

interface Props {
  courseName?: string;
  dict?: any;
}

async function DashboardHeader({ courseName, dict }: Props) {
  const user = await currentUser();
  const group = await getStudentChat(user?.id || "");

  return (
    <div className="flex items-center justify-between sticky top-0 left-0 w-full p-10 pb-5 backdrop-blur-lg z-40">
      <div className="flex items-center gap-5">
        <Link href={user?.role === "ADMIN" ? "/admin" : "/dashboard"}>
          <Image
            alt="logo"
            src={"/logo.svg"}
            height={100}
            width={150}
            className="object-cover"
          />
        </Link>
        {courseName && (
          <>
            <Separator orientation="vertical" className="w-0.5 h-8" />
            <h1 className="font-medium text-lg">{courseName}</h1>
          </>
        )}
      </div>
      <div className="flex items-center gap-7">
        {user ? (
          <>
            <SupportSheet groupId={group?.id || ""} />
            {/* <Link href={"/followup"}>
          <Button size={"lg"} variant={"addSection"} className="rounded-full">
            Follow up
          </Button>
        </Link> */}
            <UserAvatar user={user} />
          </>
        ) : (
          <>
            <Link href={"/auth/login"} className="block">
              <Button
                variant={"addSection"}
                className="rounded-full md:!w-40 bg-opacity-10 bg-[#D9D9D91A]">
                {dict?.auth?.login}
              </Button>
            </Link>
            <Link href={"/auth/register"}>
              <Button variant={"success"} className="rounded-full md:!w-40">
                {dict?.home?.signUp}
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardHeader;
