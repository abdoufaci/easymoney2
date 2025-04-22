"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTransition } from "react";
import { useModal } from "@/hooks/useModalStore";
import { ExtendedUser } from "@/types/next-auth";
import { updateUser } from "@/backend/auth-actions/update-user";

export const ProfileformSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

interface Props {
  dict: any;
  user?: ExtendedUser;
}

export function ProfileForm({ dict, user }: Props) {
  const { onClose } = useModal();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileformSchema>>({
    resolver: zodResolver(ProfileformSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const isDirty = form.formState.isDirty;

  async function onSubmit(data: z.infer<typeof ProfileformSchema>) {
    startTransition(() => {
      updateUser({ data, userId: user?.id })
        .then(() => {
          toast.success(dict.settings.updated);
          onClose();
        })
        .catch(() => {
          toast.error("Quelque chose s'est mal passé");
        });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start w-full text-[#15091B]">
              <FormLabel className="whitespace-nowrap text-[#25201C] font-medium text-sm">
                {dict.settings.fullName}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Full Name..."
                  className="w-full border border-[#D1D1D1] rounded-md placeholder:text-[#A7ABAF]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!user?.isOAuth && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full text-[#15091B]">
                <FormLabel className="whitespace-nowrap text-[#25201C] font-medium text-sm">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Email..."
                    className="w-full border border-[#D1D1D1] rounded-md placeholder:text-[#A7ABAF]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button
          disabled={isPending || !isDirty}
          type="submit"
          variant={"brand"}
          size={"lg"}
          className="h-11 w-full">
          {dict.settings.save}
        </Button>
      </form>
    </Form>
  );
}
