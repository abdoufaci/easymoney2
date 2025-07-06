"use client";

import { deleteTestimony } from "@/backend/mutations/testimony/delete-testimony";
import { Button } from "@/components/ui/button";
import { Testimony } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  testimony: Testimony;
}

function TestimonyCard({ testimony }: Props) {
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    toast.loading("deleting...");

    startTransition(() => {
      deleteTestimony(testimony.id)
        .then(() => toast.success("Testimoney deleted !"))
        .catch(() => toast.error("Something went wrong."))
        .finally(() => {
          toast.dismiss();
        });
    });
  };

  return (
    <div className="relative">
      <iframe
        key={
          //@ts-ignore
          testimony.video?.id
        }
        src={`https://iframe.mediadelivery.net/embed/${
          process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID
        }/${
          //@ts-ignore
          testimony.video?.id
        }`}
        allow="fullscreen"
        allowFullScreen
        className="w-full max-w-[210px] aspect-auto h-[375px]"></iframe>
      <Button
        disabled={isPending}
        onClick={onDelete}
        className="text-[#ED2323] bg-[#EB16194A] hover:bg-[#EB16194A] rounded-full p-1.5 cursor-pointer absolute top-1 right-1 h-8 w-8">
        <Trash2 className="h-7 w-7 " onClick={() => {}} />
      </Button>
    </div>
  );
}

export default TestimonyCard;
