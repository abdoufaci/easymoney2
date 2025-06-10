"use client";

import qs from "query-string";
import { getChat } from "@/backend/queries/chat/get-chat";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCurrentUser } from "./use-current-user";

export const useChatQuery = (groupId: string, isChat: boolean) => {
  const user = useCurrentUser();
  const fetchMessages = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: "/api/group-messages",
        query: {
          cursor: pageParam,
          groupId: groupId,
          isChat,
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
    error,
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
