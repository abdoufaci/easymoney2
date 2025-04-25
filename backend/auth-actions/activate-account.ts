"use server";

import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { ActivateSchema } from "@/schemas";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";

export const activateAccount = async (
  {
    adress,
    city,
    country,
    dateOfBirth,
    image,
    phone,
    zipCode,
  }: z.infer<typeof ActivateSchema>,
  selectedCountry: {
    code: string;
    flag: string;
    name: string;
  }
) => {
  const user = await currentUser();

  const date = new Date();
  date.setFullYear(Number(dateOfBirth.year));
  date.setMonth(Number(dateOfBirth.month) - 1);
  date.setDate(Number(dateOfBirth.day));

  const studentNumber = new ShortUniqueId({ length: 10, dictionary: "number" });

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
};
