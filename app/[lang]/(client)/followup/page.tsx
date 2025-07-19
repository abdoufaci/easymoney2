import { LampDemo } from "@/components/ui/lamp";
import FollowupMain from "./_components/followup-main";
import DashboardHeader from "@/components/dashboard-header";
import { getVideoById } from "@/backend/mutations/courses/get-video-by-id";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import db from "@/lib/db";
import { currentUser } from "@/lib/auth";
import JoinButton from "./_components/join-button";
import StudentsTestimonies from "./_components/students-testimonies";
import { getTestimonyGroups } from "@/backend/queries/testimoney/get-testimony-groups";
import type { Metadata } from "next";
import { poppins } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import DownloadApp from "@/components/home/download-app";
import { getDictionary } from "../../dictionaries";

export const metadata: Metadata = {
  title: "EasyMoney University",
  description: "EasyMoney University",
  icons: {
    icon: "/icon.png",
    href: "/icon.png",
  },
};

async function FollowUpPage({ params }: any) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const [video, user, groups] = await Promise.all([
    getVideoById("b5532ebf91d94b1cbed09773fcd2666a"),
    currentUser(),
    getTestimonyGroups(),
  ]);

  const section = await db.section.findFirst({
    where: {
      courses: {
        some: {
          isActive: true,
        },
      },
      isMain: true,
    },
    include: {
      courses: {
        where: {
          isActive: true,
        },
        include: {
          videos: {
            include: {
              progress: {
                where: {
                  userId: user?.id,
                },
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          },
          students: {
            where: {
              id: user?.role === "USER" ? user?.id : undefined,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  const isOwned = await db.group.findFirst({
    where: {
      status: {
        not: "CLOSED",
      },
      members: {
        some: {
          id: user?.id,
        },
      },
    },
  });

  return (
    <div className={cn("relative", poppins.className)}>
      <DashboardHeader dict={dict} />
      <LampDemo {...video} />
      <div className="w-[80%] mx-auto space-y-5">
        {user ? (
          <JoinButton isOwned={!!isOwned} section={section} />
        ) : (
          <div className="flex items-center justify-center pt-24">
            <Link href={"/auth/register"}>
              <Button variant={"success"} className="rounded-full w-40">
                {dict.home.getStarted}
              </Button>
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 md:!grid-cols-2 place-content-center place-items-center gap-10">
          <Image
            alt="blur"
            src={"/followup-blur-1.png"}
            height={400}
            width={400}
            className="absolute bottom-0 left-0"
          />
          <Image
            alt="blur"
            src={"/followup-blur-2.png"}
            height={400}
            width={400}
            className="absolute bottom-0 right-0"
          />
          <Image
            alt="phones"
            src={"/phones.svg"}
            height={500}
            width={500}
            className="w-full aspect-square object-cover"
          />

          <DownloadApp lang={lang} dict={dict} />
        </div>
      </div>
    </div>
  );
}

export default FollowUpPage;
