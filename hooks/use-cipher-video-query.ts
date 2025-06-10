"use client";

import { getVideoById } from "@/backend/mutations/courses/get-video-by-id";
import { useQuery } from "@tanstack/react-query";

export const useCipherVideoQuery = (videoId: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["cipher-video", videoId],
    queryFn: () => getVideoById(videoId),
  });

  return {
    data,
    isPending,
  };
};
