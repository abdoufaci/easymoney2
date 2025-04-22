import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { currentUser } from "@/lib/auth";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import UserAvatar from "./user-avatar";

interface Props {
  courseName?: string;
}

async function DashboardHeader({ courseName }: Props) {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-between sticky top-0 left-0 w-full p-10">
      <div className="flex items-center gap-5">
        <Image
          alt="logo"
          src={"/logo.svg"}
          height={100}
          width={150}
          className="object-cover"
        />
        {courseName && (
          <>
            <Separator orientation="vertical" className="w-0.5 h-8" />
            <h1 className="font-medium text-lg">{courseName}</h1>
          </>
        )}
      </div>
      <div className="flex items-center gap-7">
        {!courseName && (
          <Button size={"lg"} variant={"addSection"} className="rounded-full">
            Follow up
          </Button>
        )}
        <UserAvatar user={user} />
      </div>
    </div>
  );
}

export default DashboardHeader;
