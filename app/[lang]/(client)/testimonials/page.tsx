import { LampDemo } from "@/components/ui/lamp";
import DashboardHeader from "@/components/dashboard-header";
import { getVideoById } from "@/backend/mutations/courses/get-video-by-id";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import db from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getTestimonyGroups } from "@/backend/queries/testimoney/get-testimony-groups";
import type { Metadata } from "next";
import { poppins } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import JoinButton from "../followup/_components/join-button";
import StudentsTestimonies from "../followup/_components/students-testimonies";
import { getDictionary } from "../../dictionaries";

export const metadata: Metadata = {
  title: "EasyMoney University",
  description: "EasyMoney University",
  icons: {
    icon: "/icon.png",
    href: "/icon.png",
  },
};

async function TestimonialPage({ params }: any) {
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
    <div className={cn("relative pb-20", poppins.className)}>
      <DashboardHeader dict={dict} />
      <LampDemo {...video} title={dict.testimonials.title} />
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
        <div className="flex flex-col items-center justify-center gap-10 pt-40">
          <div className="flex flex-col items-center space-y-3">
            <h1 className="text-4xl font-medium">
              {dict.testimonials.testiTitle}
            </h1>
            <h3 className="bg-gradient-to-r from-[#1FB4AB] to-[#00FFF0] text-transparent bg-clip-text font-medium text-4xl">
              {dict.testimonials.testiSubTitle}
            </h3>
          </div>
          <StudentsTestimonies dict={dict} groups={groups} />
        </div>
      </div>
    </div>
  );
}

export default TestimonialPage;
