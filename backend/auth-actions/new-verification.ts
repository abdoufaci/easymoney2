"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import db from "@/lib/db";

export const newVerification = async (token: string, dict: any) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: dict.auth.tokendoesNotExist };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error: dict.auth.tokenExpired,
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: dict.auth.emailDoesNotExist };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: dict.auth.emailVerified };
};
