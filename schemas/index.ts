import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabeled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New password is required !",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "password is required !",
      path: ["Password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Min 6 character required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Min 6 character required",
  }),
  name: z.string().min(1, {
    message: "Name is Required",
  }),
});

export const ActivateSchema = z.object({
  phone: z.string().min(1, {
    message: "Phone is Required",
  }),
  image: z
    .object({
      url: z.string(),
      key: z.string(),
    })
    .optional(),
  zipCode: z.string(),
  country: z.string(),
  city: z.string(),
  adress: z.string(),
  dateOfBirth: z.object({
    day: z.string(),
    month: z.string(),
    year: z.string(),
  }),
});

export const StudentSettingsSchema = z.object({
  name: z.string().min(1, {
    message: "Name is Required",
  }),
  image: z
    .object({
      url: z.string(),
      key: z.string(),
    })
    .optional(),
});

export const VerificationDocumentsSchema = z.object({
  document1: z.object({
    url: z.string(),
    key: z.string(),
  }),
  document2: z.object({
    url: z.string(),
    key: z.string(),
  }),
});
