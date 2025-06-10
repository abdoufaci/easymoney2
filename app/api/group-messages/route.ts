import db from "@/lib/db";
import { GroupMessageWithUser, SupportMessageWithUser } from "@/types/types";
import { GroupMessage, Test, User } from "@prisma/client";
import { NextResponse } from "next/server";

const MESSAGES_BATCH = 25;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const groupId = searchParams.get("groupId");
    const isChat = searchParams.get("isChat") === "true";

    if (!groupId) {
      return new NextResponse("Group ID", { status: 400 });
    }

    let messages: GroupMessageWithUser[] | SupportMessageWithUser[] = [];

    if (cursor) {
      if (isChat) {
        messages = await db.supportMessage.findMany({
          where: {
            supportGroupId: groupId,
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
          skip: 1,
          cursor: {
            id: cursor,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }
    } else {
      if (isChat) {
        messages = await db.supportMessage.findMany({
          where: {
            supportGroupId: groupId,
          },
          include: {
            user: true,
          },
          take: MESSAGES_BATCH,
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
    }

    let nextCursor = null;

    if (messages.length === MESSAGES_BATCH) {
      nextCursor = messages[MESSAGES_BATCH - 1].id;
    }

    console.log("getChat completed");

    return NextResponse.json({
      items: messages,
      nextCursor,
    });
  } catch (error) {
    console.log("[MESSAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
