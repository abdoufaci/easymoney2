"use client";

import { useCipherVideoQuery } from "@/hooks/use-cipher-video-query";
import { Loader2 } from "lucide-react";

interface Props {
  videoId: string;
}

function CipherVideo({ videoId }: Props) {
  const { data, isPending } = useCipherVideoQuery(videoId);

  if (isPending) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="h-7 w-7 text-brand animate-spin" />
      </div>
    );
  }
  if (data)
    return (
      <iframe
        src={`https://player.vdocipher.com/v2/?otp=${data.otp}&playbackInfo=${data.playbackInfo}`}
        style={{ border: 0 }}
        allowFullScreen={true}
        allow="encrypted-media"
        className="w-full h-full"></iframe>
    );
}

export default CipherVideo;
