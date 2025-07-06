"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useModal } from "@/hooks/useModalStore";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import { CourseWithVideosProgress } from "@/types/types";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CheckoutCartBody() {
  const { data } = useModal();
  const { cartSection: section, user: currentUser } = data;
  console.log({
    currentUser,
  });
  const [selectedCourses, setSelectedCourses] = useState<
    CourseWithVideosProgress[]
  >([]);
  const [isPending, startTransition] = useTransition();
  const [isFollowup, setIsFollowup] = useState(false);
  const router = useRouter();

  const total =
    selectedCourses.reduce(
      (acc, item) =>
        acc +
        Number(
          //@ts-ignore
          currentUser?.phone?.startsWith("+213")
            ? item.priceInDa
            : item.priceInEuro
        ),
      0
    ) + (isFollowup ? 150 : 0);

  const onPay = () => {
    toast.loading("redirecting...");
    const courseIds = selectedCourses.map((c) => c.id).join(",");
    const followupStr = isFollowup ? "1" : "0";

    var raw = JSON.stringify({
      price_amount: total,
      price_currency: "usd",
      order_id: currentUser?.id || "",
      order_description: `courses=${courseIds};followup=${followupStr}`,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_HOME_URL}api/webhooks/nowpayments`, // Your webhook endpoint
      success_url: `${process.env.NEXT_PUBLIC_HOME_URL}success`,
      cancel_url: `${process.env.NEXT_PUBLIC_HOME_URL}cancel`,
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
        })
        .catch((error) => console.log("error", error));
    });
  };

  const canBuyFollowup = section?.courses.every(
    (course) =>
      !!selectedCourses.find((item) => item.id === course.id) ||
      !!course.students.find((student) => student.id === currentUser?.id)
  );

  console.log({
    currentUser,
  });

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        {section?.courses.map((course, idx) => {
          const isOwned = !!course.students.find(
            (student) => student.id === currentUser?.id
          );

          const isSelected = !!selectedCourses.find(
            (item) => item.id === course.id
          );

          const isDisabled = !section.isMain
            ? false
            : isOwned || idx === 0
            ? false
            : !selectedCourses.find(
                (item) => item.id === section.courses[idx - 1].id
              ) &&
              !section.courses[idx - 1].students.find(
                (student) => student.id === currentUser?.id
              );
          return (
            <div
              key={course.id}
              aria-disabled={isDisabled}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (!isOwned && !isDisabled) {
                  if (isSelected) {
                    setSelectedCourses((prev) =>
                      prev.filter(
                        (item, index) =>
                          item.id !== course.id &&
                          (section.isMain ? index < idx : true)
                      )
                    );
                    setIsFollowup(false);
                  } else {
                    setSelectedCourses((prev) => [...prev, course]);
                  }
                }
              }}
              className={cn(
                "border-[1px] border-white rounded-full px-5 py-3.5 flex items-center justify-between aria-disabled:cursor-not-allowed aria-disabled:border-white/50 aria-disabled:text-white/50",
                isOwned ? "" : "cursor-pointer"
              )}>
              <h1 className="font-light">
                {course.englishTitle}{" "}
                {!isOwned && (
                  <span
                    aria-disabled={isDisabled}
                    className="text-brand font-medium aria-disabled:text-brand/50">
                    {
                      //@ts-ignore
                      currentUser?.phone?.startsWith("+213")
                        ? course.priceInDa
                        : course.priceInEuro
                    }{" "}
                    {
                      //@ts-ignore
                      currentUser?.phone?.startsWith("+213") ? "DA" : "$"
                    }
                  </span>
                )}{" "}
              </h1>
              {isOwned ? (
                <h1 className="text-brand text-sm">Owned </h1>
              ) : (
                <Checkbox
                  aria-disabled={isDisabled}
                  className="rounded-full h-6 w-6 data-[state=checked]:bg-brand data-[state=checked]:text-white data-[state=checked]:border-brand
                  aria-disabled:border-white/50 aria-disabled:cursor-not-allowed
                  "
                  checked={isSelected}
                  onCheckedChange={(checked) => {
                    if (isDisabled) {
                      return;
                    }
                    if (checked) {
                      setSelectedCourses((prev) =>
                        prev.filter(
                          (item, index) =>
                            item.id !== course.id &&
                            (section.isMain ? index < idx : true)
                        )
                      );
                      setIsFollowup(false);
                    } else {
                      setSelectedCourses((prev) => [...prev, course]);
                    }
                  }}
                />
              )}
            </div>
          );
        })}
        {section?.isMain && (
          <div
            aria-disabled={!canBuyFollowup}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsFollowup((prev) => !prev);
            }}
            className={cn(
              "border-[1px] border-white rounded-full px-5 py-3.5 flex items-center justify-between aria-disabled:cursor-not-allowed aria-disabled:border-white/50 aria-disabled:text-white/50",
              !canBuyFollowup ? "" : "cursor-pointer"
            )}>
            <h1 className="font-light">
              FollowUp{" "}
              <span
                aria-disabled={!canBuyFollowup}
                className="text-brand font-medium aria-disabled:text-brand/50">
                150 $
              </span>
            </h1>
            <Checkbox
              aria-disabled={!canBuyFollowup}
              className="rounded-full h-6 w-6 data-[state=checked]:bg-brand data-[state=checked]:text-white data-[state=checked]:border-brand
                  aria-disabled:border-white/50 aria-disabled:cursor-not-allowed
                  "
              checked={isFollowup}
              onCheckedChange={(checked) => {
                setIsFollowup((prev) => !prev);
              }}
            />
          </div>
        )}
      </div>
      <div className="space-y-3 px-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium">Total</h1>
          <h3 className="font-medium">
            {total}{" "}
            {
              //@ts-ignore
              currentUser?.phone?.startsWith("+213") ? "DA" : "$"
            }{" "}
          </h3>
        </div>
        <Button
          onClick={() =>
            //@ts-ignore
            currentUser?.phone?.startsWith("+213")
              ? router.push("https://t.me/EasymoneySupport2")
              : onPay()
          }
          disabled={(!selectedCourses.length && !isFollowup) || isPending}
          variant={"brand"}
          size={"lg"}
          className="rounded-full w-full">
          Checkout
        </Button>
      </div>
    </div>
  );
}

export default CheckoutCartBody;
