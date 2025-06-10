"use server";

import { MessageType } from "@prisma/client";
import { deleteFiles } from "../delete-file";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/auth";

export const deleteMessage = async (
  messageId: string,
  messageType: MessageType,
  file: {
    url: string;
    key: string;
    size: string;
    type: string;
    name?: string;
  } | null,
  isChat: boolean
) => {
  const user = await currentUser();
  let message: any;

  if (isChat) {
    message = await db.supportMessage.delete({
      where: {
        id: messageId,
        userId: user?.id || "",
      },
    });
  } else {
    message = await db.groupMessage.delete({
      where: {
        id: messageId,
        userId: user?.id || "",
      },
    });
  }

  if (messageType != "TEXT" && file && message) {
    await deleteFiles([file]);
  }
  revalidatePath("/");
};
