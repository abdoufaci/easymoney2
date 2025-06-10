"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { StudentSettingsSchema } from "@/schemas";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { AvatarImageUpload } from "../avatar-upload";
import { User } from "@prisma/client";
import { useModal } from "@/hooks/useModalStore";
import { updateSettings } from "@/backend/mutations/users/update-settings";
import { toast } from "sonner";

interface Props {
  dict: any;
  user: User | null;
}

export function StudentSettingsForm({ dict, user }: Props) {
  const [isPending, startTransition] = useTransition();
  const [imageToDelete, setImageToDelete] = useState<{
    url: string;
    key: string;
  } | null>(null);

  const { onOpen } = useModal();

  const form = useForm<z.infer<typeof StudentSettingsSchema>>({
    resolver: zodResolver(StudentSettingsSchema),
    defaultValues: {
      name: user?.name || "",
      //@ts-ignore
      image: user?.image,
    },
  });

  const {
    formState: { isDirty },
  } = form;

  const onSubmit = (data: z.infer<typeof StudentSettingsSchema>) => {
    startTransition(async () => {
      updateSettings(data, imageToDelete)
        .then(() => toast.success(dict.settings.updated))
        .catch((err) => toast.error("Something went wrong"));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4 text-white">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col justify-center items-center gap-3 w-full relative">
                    <h1>
                      {user?.VerificationStatus != "VERIFIED"
                        ? dict.general.notVerified
                        : dict.general.verified}
                    </h1>
                    <AvatarImageUpload
                      value={form.watch("image")}
                      onChange={field.onChange}
                      endpoint="logoUploader"
                      setImageToDelete={setImageToDelete}
                      settings
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {user?.VerificationStatus != "VERIFIED" && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onOpen("addVerificationDocuments", { dict });
              }}
              variant={"brand"}
              size={"xl"}
              className="rounded-full w-full">
              {user?.VerificationStatus !== "PENDING"
                ? dict.settings.verifyAccount
                : dict.settings.processingVerification}
            </Button>
          )}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">{dict.auth.name}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder={dict.auth.name}
                    className="border-white border-[0.54px] text-white placeholder:text-white py-6 pl-5 rounded-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          variant={"white"}
          type="submit"
          disabled={!isDirty || isPending}
          size={"lg"}
          className="w-full rounded-full">
          Save
        </Button>
      </form>
    </Form>
  );
}
