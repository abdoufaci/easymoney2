"use server";

import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ClientUploadedFileData } from "uploadthing/types";

export const addVoiceMessage = async ({
  groupId,
  file,
  isChat = false,
}: {
  groupId: string;
  file: {
    url: string;
    key: string;
  };
  isChat?: boolean;
}) => {
  const user = await currentUser();

  console.log("Adding voice message [server]");

  if (isChat) {
    await db.supportGroup.update({
      where: { id: groupId },
      data: {
        messages: {
          create: {
            userId: user?.id || "",
            type: "AUDIO",
            file,
          },
        },
        id: groupId,
      },
    });
  } else {
    await db.group.update({
      where: { id: groupId },
      data: {
        messages: {
          create: {
            userId: user?.id || "",
            type: "AUDIO",
            file,
          },
        },
      },
    });
  }

  revalidatePath("/");
};
