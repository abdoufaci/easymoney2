"use client";

import { useChatQuery } from "@/hooks/use-chat-query";
import { ElementRef, useEffect, useRef, useState } from "react";
import { InfiniteData } from "@tanstack/react-query";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { GroupMessageWithUser } from "@/types/types";
import GroupMessage from "./group-message";
import { ArrowDown, Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useCurrentUser } from "@/hooks/use-current-user";

interface Props {
  groupId: string;
  isChat?: boolean;
  isDirectChat?: boolean;
}

function ChatBody({ groupId, isChat = false, isDirectChat = false }: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    refetch,
  } = useChatQuery(groupId, isChat, isDirectChat);
  const currentUser = useCurrentUser();

  const [addedData, setAddedData] = useState<GroupMessageWithUser[]>([]);

  const [messages, setMessages] = useState<
    InfiniteData<
      {
        items: GroupMessageWithUser[];
        nextCursor: string | null;
      },
      unknown
    >
  >();

  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const wasAtBottomRef = useRef(true);
  const [userScrolled, setUserScrolled] = useState(false);
  const [notification, setNotification] = useState(0);

  const [Buttonref, ButtonInView] = useInView();

  useEffect(() => {
    if (ButtonInView) {
      fetchNextPage();
    }
  }, [ButtonInView]);

  useEffect(() => {
    setMessages(data);
  }, [data]);

  useEffect(() => {
    const channel = supabase
      .channel("chat-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: isDirectChat
            ? "DirectMessage"
            : isChat
            ? "SupportMessage"
            : "GroupMessage",
        },
        async (payload) => {
          const { data: user } = await supabase
            .from("User")
            .select("*")
            .eq("id", payload.new.userId)
            .single();

          if (user) {
            const isOwnMessage = currentUser?.id === payload.new.userId;

            setAddedData((prev) => {
              const newMessages = [
                { ...payload.new, user } as GroupMessageWithUser,
                ...prev,
              ];

              requestAnimationFrame(() => {
                const scrollContainer = scrollRef.current;
                if (
                  (wasAtBottomRef.current || isOwnMessage) &&
                  scrollContainer
                ) {
                  scrollContainer.scrollTop = scrollContainer.scrollHeight;
                }
              });

              return newMessages;
            });
          }

          const scrollContainer = scrollRef.current;
          if (
            scrollContainer.scrollTop <
              scrollContainer.scrollHeight -
                scrollContainer.clientHeight -
                10 &&
            currentUser?.id !== payload.new.userId
          ) {
            setNotification((current) => current + 1);
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: isDirectChat
            ? "DirectMessage"
            : isChat
            ? "SupportMessage"
            : "GroupMessage",
        },
        (payload) => {
          const updated = payload.new as GroupMessageWithUser;

          // Update local addedData if needed
          setAddedData((prev) =>
            prev.map((item) => (item.id === updated.id ? updated : item))
          );

          setMessages((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              pages: prev.pages.map((page) => ({
                ...page,
                items: page.items.map((item) =>
                  item.id === updated.id ? { ...item, ...updated } : item
                ),
              })),
            };
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: isDirectChat
            ? "DirectMessage"
            : isChat
            ? "SupportMessage"
            : "GroupMessage",
        },
        (payload) => {
          const deletedId = payload.old.id;

          setAddedData((prev) => prev.filter((item) => item.id !== deletedId));

          setMessages((prev) => {
            if (!prev) return prev;

            const deletedWasCursor = prev.pages.some((page, idx) => {
              const lastItem = page.items[page.items.length - 1];
              const isLastPage = idx === prev.pages.length - 1;
              return isLastPage && lastItem?.id === deletedId;
            });

            const updatedPages = prev.pages.map((page) => ({
              ...page,
              items: page.items.filter((item) => item.id !== deletedId),
            }));

            if (deletedWasCursor) {
              refetch();
            }

            return {
              ...prev,
              pages: updatedPages,
            };
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [data, refetch]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer && !userScrolled) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const handleOnScroll = () => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const isScroll =
        scrollContainer.scrollTop <
        scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
      setUserScrolled(isScroll);
      wasAtBottomRef.current = !isScroll;
      if (
        scrollContainer.scrollTop ===
        scrollContainer.scrollHeight - scrollContainer.clientHeight
      ) {
        setNotification(0);
      }
    }
  };
  const scrollDown = () => {
    setNotification(0);
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  const allIds = new Set(addedData.map((item) => item.id));

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={handleOnScroll}
        className="flex-1 flex flex-col p-5 h-full overflow-y-auto space-y-4">
        {!isFetchingNextPage && hasNextPage && (
          <Button
            ref={Buttonref}
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}>
            More
          </Button>
        )}
        {isFetchingNextPage && (
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-brand animate-spin" />
          </div>
        )}
        {isPending && (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 text-brand animate-spin" />
          </div>
        )}
        <div className="flex flex-col-reverse gap-8">
          {addedData.map((item, idx) => (
            <GroupMessage key={item.id} message={item} isChat={isChat} />
          ))}
          {messages?.pages.map((page) =>
            page.items
              .filter((item) => !allIds.has(item.id))
              .map((item) => (
                <GroupMessage key={item.id} message={item} isChat={isChat} />
              ))
          )}
        </div>
      </div>
      {userScrolled && (
        <div className=" absolute bottom-24 w-full">
          {notification ? (
            <div
              className="w-36 mx-auto bg-[#1A1D24] p-1 rounded-md cursor-pointer border border-brand flex items-center justify-center"
              onClick={scrollDown}>
              <h1 className="text-xs text-brand">
                New {notification} messages
              </h1>
            </div>
          ) : (
            <div
              className="w-7 h-7 bg-[#1A1D24] border-brand rounded-full justify-center items-center flex mx-auto border cursor-pointer hover:scale-110 transition-all"
              onClick={scrollDown}>
              <ArrowDown className="h-4 w-4 text-brand" />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ChatBody;
