"use server";

import { signOut } from "@/auth";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";

export const logout = async () => {
  const auth = await currentUser();
  const user = await getUserById(auth?.id || "");

  await signOut();
  if (!user) return;

  await db.user.update({
    where: { id: user.id },
    data: {
      sessions: 0,
    },
  });
};
