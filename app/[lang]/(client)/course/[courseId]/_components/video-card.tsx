import { addVideoProgress } from "@/backend/queries/courses/add-video-progress";
import { removeVideoProgress } from "@/backend/queries/courses/remove-video-progress";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { VideoProgress } from "@prisma/client";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  videoName: string;
  isCompleted?: boolean;
  isSelected: boolean;
  onClick: () => void;
  videoId: string;
  progress: VideoProgress[];
}

export default function VideoCard({
  videoName,
  isCompleted = false,
  isSelected,
  onClick,
  videoId,
  progress,
}: Props) {
  const [isPending, startTranstion] = useTransition();

  const onCheck = async () => {
    startTranstion(() => {
      addVideoProgress(videoId)
        .then(() => toast.success("Video marked as complete !"))
        .catch(() => toast.error("Something went wrong ."));
    });
  };

  const onDeCheck = async () => {
    startTranstion(() => {
      removeVideoProgress(progress[0].id)
        .then(() => toast.success("Video marked as uncomplete !"))
        .catch(() => toast.error("Something went wrong ."));
    });
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 rounded-full p-4 px-6 bg-[#D9D9D91A] w-full md:!w-[75%] cursor-pointer",
        isSelected && "border border-brand"
      )}>
      <Checkbox
        onCheckedChange={(e) => (e ? onCheck() : onDeCheck())}
        checked={isCompleted}
        disabled={isPending}
        className="rounded-full data-[state=checked]:bg-brand data-[state=checked]:text-white data-[state=checked]:border-none h-5 w-5"
      />
      <h1>{videoName}</h1>
    </div>
  );
}
