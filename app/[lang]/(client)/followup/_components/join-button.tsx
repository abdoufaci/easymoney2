"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { SectionWithCourseWithVideosProgress } from "@/types/types";

interface Props {
  isOwned: boolean;
  section: SectionWithCourseWithVideosProgress | null;
}

function JoinButton({ section, isOwned }: Props) {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-center">
      <Button
        onClick={() => {
          if (!isOwned) {
            onOpen("checkoutCart", {
              //@ts-ignore
              cartSection: section,
            });
          }
        }}
        size={"lg"}
        variant={"success"}
        className="rounded-full mt-32">
        {!!isOwned ? "Owned" : "Get it with 150$"}
      </Button>
    </div>
  );
}

export default JoinButton;
