"use server";

import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { ActivateSchema } from "@/schemas";
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
      dateOfBirth,
      isActive: true,
      image,
    },
  });
};
