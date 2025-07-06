"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { cp } from "fs";
import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { linkReservations } from "../mutations/link-reservations";
import { v4 } from "uuid";

export const register = async (
  values: z.infer<typeof RegisterSchema>,
  dict: any
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: dict.auth.invalidFields };
  }

  const { email, firstName, lastName, password } = validatedFields.data;
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: dict.auth.emailAlreadyUsed };
  }

  const user = await db.user.create({
    data: {
      name: firstName + " " + lastName,
      email,
      password: hashedPassword,
      SupportGroup: {
        create: {
          id: v4(),
        },
      },
      directGroups: {
        create: {
          id: v4(),
        },
      },
    },
  });

  linkReservations({
    userEmail: email,
    userId: user.id,
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
    user.name || ""
  );

  return {
    success: dict.auth.confirmationEmail,
  };
};
