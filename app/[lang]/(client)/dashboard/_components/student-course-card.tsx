"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useModal } from "@/hooks/useModalStore";
import { truncate } from "@/lib/truncate";
import { cn } from "@/lib/utils";
import { ExtendedUser } from "@/types/next-auth";
import { CourseWithVideosProgress } from "@/types/types";
import { User } from "@prisma/client";
import { Clock2, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  course: CourseWithVideosProgress;
  user: User | null;
  isArabic: boolean;
  dict: any;
}

function StudentCourseCard({ course, user, isArabic, dict }: Props) {
  const doneVideos = course?.videos.filter(
    (videos) => !!videos.progress.length
  ).length;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const progress = Math.round((doneVideos / course.videos.length) * 100);

  const { onOpen } = useModal();

  const onPay = () => {
    toast.loading("redirecting...");
    var raw = JSON.stringify({
      price_amount: Number(course.priceInEuro),
      price_currency: "usd",
      order_id: user?.id || "",
      order_description: course.englishDesc,
      ipn_callback_url:
        "https://direct-poetic-javelin.ngrok-free.app/api/webhooks/nowpayments", // Your webhook endpoint
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    startTransition(() => {
      fetch("https://api-sandbox.nowpayments.io/v1/invoice", {
        method: "POST",
        headers: {
          "x-api-key": `${process.env.NEXT_PUBLIC_NOW_PAYMENT_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: raw,
      })
        .then(async (response) => {
          const res = await response.json();
          toast.dismiss();
          return res;
        }) // Parse as JSON to see the payment link
        .then((result) => {
          router.push(result.invoice_url);
          console.log({ result });
        })
        .catch((error) => console.log("error", error));
    });
  };

  return (
    <div
      onClick={
        !!course.students.length &&
        (user?.VerificationStatus === "NOT_VERIFIED" ||
          user?.VerificationStatus === "REJECTED")
          ? () => onOpen("verifyNowLater", { dict })
          : undefined
      }
      className={cn(
        "w-full max-w-sm rounded-md bg-gradient-to-b from-[#40414F]/35 to-[#1B1B1F]/35",
        !!course.students.length &&
          (user?.VerificationStatus === "NOT_VERIFIED" ||
            user?.VerificationStatus === "REJECTED")
          ? "cursor-pointer"
          : ""
      )}>
      <Image
        alt="course"
        src={
          //@ts-ignore
          course?.image?.url || ""
        }
        height={500}
        width={500}
        className="w-full h-64 rounded-t-md"
      />
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <VideoIcon className="h-5 w-5 text-brand" />
              <h1 className="text-sm">{course.videos.length}</h1>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">
            {isArabic ? course.arabicTitle : course.englishTitle}
          </h1>
          <p className="text-[#CCCCCC]">
            {truncate(isArabic ? course.arabicDesc : course.englishDesc, 80)}
          </p>
          {!!course.students.length ? (
            <div className="space-y-1">
              <Progress value={progress} />
              <h1 className="text-brand">{progress}%</h1>
            </div>
          ) : user?.VerificationStatus === "VERIFIED" ? (
            // <Link href={"https://t.me/EasymoneySupport2"} target="_blank">
            //   <Button className="radialGradient rounded-full text-white BuyCourseShadows p-0 px-7 h-8">
            //     {isArabic ? "احصل عليها ب" : "Get with"}{" "}
            //     {user?.phone?.startsWith("+213")
            //       ? `${course.priceInDa} DA`
            //       : `${course.priceInEuro}$`}
            //   </Button>
            // </Link>
            <Button
              disabled={isPending}
              onClick={onPay}
              className="radialGradient rounded-full text-white BuyCourseShadows p-0 px-7 h-8">
              {isArabic ? "احصل عليها ب" : "Get with"}{" "}
              {user?.phone?.startsWith("+213")
                ? `${course.priceInDa} DA`
                : `${course.priceInEuro}$`}
            </Button>
          ) : (
            <Button
              onClick={() => onOpen("verifyNowLater", { dict })}
              className="radialGradient rounded-full text-white BuyCourseShadows p-0 px-7 h-8">
              {isArabic ? "احصل عليها ب" : "Get with"}{" "}
              {user?.phone?.startsWith("+213")
                ? `${course.priceInDa} DA`
                : `${course.priceInEuro}$`}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentCourseCard;
