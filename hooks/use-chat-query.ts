"use client";

import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useChatQuery = (
  groupId: string,
  isChat: boolean,
  isDirectChat: boolean
) => {
  const fetchMessages = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: "/api/group-messages",
        query: {
          cursor: pageParam,
          groupId: groupId,
          isChat,
          isDirectChat,
        },
      },
      { skipNull: true }
    );
    const res = await fetch(url);
    return res.json();
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isPending,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["group-chat", groupId],
    queryFn: fetchMessages,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    initialPageParam: undefined,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isPending,
    refetch,
  };
};
