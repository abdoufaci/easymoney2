"use server";

import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { ActivateSchema } from "@/schemas";
import { ExtendedUser } from "@/types/next-auth";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";
import { logout } from "./logout";

export const activateAccount = async (
  {
    adress,
    city,
    country,
    year,
    month,
    day,
    image,
    phone,
    zipCode,
  }: z.infer<typeof ActivateSchema>,
  selectedCountry: {
    code: string;
    flag: string;
    name: string;
  },
  user?: ExtendedUser
) => {
  try {
    if (!user) {
      logout();
      return;
    }

    const date = new Date();
    date.setFullYear(Number(year));
    date.setMonth(Number(month) - 1);
    date.setDate(Number(day));

    const studentNumber = new ShortUniqueId({
      length: 10,
      dictionary: "number",
    });

    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        phone: `${selectedCountry.code}${phone}`,
        country,
        zipCode,
        adress,
        city,
        dateOfBirth: date,
        isActive: true,
        image,
        studentNumber: studentNumber.rnd(),
      },
    });
  } catch (error) {
    console.log({
      error,
      phone,
    });
    throw new Error("Activate error");
  }
};
