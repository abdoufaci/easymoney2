"use server";

import { MessageType } from "@prisma/client";
import { deleteFiles } from "../delete-file";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/auth";
import { deleteEverythingFile } from "../delete-everthing-file";

export const deleteMessage = async (
  messageId: string,
  messageType: MessageType,
  file: {
    id: string;
    type: string;
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
    await deleteEverythingFile(file);
  }
  revalidatePath("/");
};
