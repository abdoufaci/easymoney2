"use server";

import db from "@/lib/db";
import { GroupMessage, Test, User } from "@prisma/client";

const MESSAGES_BATCH = 1;

export const getChat = async ({
  pageParam: cursor,
  groupId,
}: {
  pageParam?: string;
  groupId: string;
}) => {
  console.log("starting getChat");
  let messages: (GroupMessage & {
    user: User;
  })[] = [];

  if (cursor) {
    messages = await db.groupMessage.findMany({
      where: {
        groupId,
      },
      include: {
        user: true,
      },
      take: MESSAGES_BATCH,
      skip: 1,
      cursor: {
        id: cursor,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    messages = await db.groupMessage.findMany({
      where: {
        groupId,
      },
      include: {
        user: true,
      },
      take: MESSAGES_BATCH,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  let nextCursor = null;

  if (messages.length === MESSAGES_BATCH) {
    nextCursor = messages[MESSAGES_BATCH - 1].id;
  }

  console.log("getChat completed");

  return {
    items: messages,
    nextCursor,
  };
};
