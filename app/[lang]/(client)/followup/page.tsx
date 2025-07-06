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

export const metadata: Metadata = {
  title: "EasyMoney University",
  description: "EasyMoney University",
  icons: {
    icon: "/icon.png",
    href: "/icon.png",
  },
};

async function FollowUpPage() {
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
      <DashboardHeader />
      <LampDemo {...video} />
      <div className="w-[80%] mx-auto space-y-5">
        <JoinButton isOwned={!!isOwned} section={section} />
        <div className="flex flex-col items-center justify-center gap-10 pt-40">
          <div className="flex flex-col items-center space-y-3">
            <h1 className="text-4xl font-medium">
              Don’t take our word for it.
            </h1>
            <h3 className="bg-gradient-to-r from-[#1FB4AB] to-[#00FFF0] text-transparent bg-clip-text font-medium text-4xl">
              Trust our student
            </h3>
          </div>
          <StudentsTestimonies groups={groups} />
        </div>
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
          <div className="flex flex-col items-start justify-center gap-5 w-full h-full">
            <Image
              alt="warning"
              src={"/warning.png"}
              height={20}
              width={20}
              className="object-cover"
            />
            <h1 className="text-2xl font-medium">
              The Follow-Up is available exclusively on the mobile app.
            </h1>
            <p className="text-[#DEDEDE] text-sm">
              When you purchase this plan, you’ll need to download the mobile
              app to access the Follow-Up section and receive daily guidance
              from the admin.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Image
                alt="playStore"
                src={"/qr.svg"}
                height={200}
                width={200}
                layout="intrinsic"
              />
              <div className="flex flex-wrap items-center gap-2">
                <Image
                  alt="playStore"
                  src={"/google-play.svg"}
                  height={150}
                  width={150}
                  layout="intrinsic"
                />
                <Image
                  alt="appleStore"
                  src={"/apple-store.svg"}
                  height={150}
                  width={150}
                  layout="intrinsic"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowUpPage;
