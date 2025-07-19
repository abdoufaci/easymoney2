"use server";

import db from "@/lib/db";
import { EditStudentSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const editStudent = async ({
  data,
  studentId,
  selectedCountry,
}: {
  data: z.infer<typeof EditStudentSchema>;
  studentId?: string;
  selectedCountry: {
    code: string;
    flag: string;
    name: string;
  };
}) => {
  if (!studentId) {
    throw new Error("Student not found .");
  }

  const phone = `${selectedCountry.code}${data.phone}`;
  const name = data.firstName + " " + data.lastName;
  const date = new Date();
  date.setFullYear(Number(data.year));
  date.setMonth(Number(data.month) - 1);
  date.setDate(Number(data.day));

  console.log({
    date,
  });

  delete (data as any).firstName;
  delete (data as any).lastName;
  delete (data as any).year;
  delete (data as any).month;
  delete (data as any).day;
  delete (data as any).phone;

  await db.user.update({
    where: {
      id: studentId,
    },
    data: {
      name,
      dateOfBirth: date,
      //@ts-ignore
      phone,
      ...data,
    },
  });

  revalidatePath("/");
};
