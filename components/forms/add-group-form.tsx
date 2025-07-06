"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { useModal } from "@/hooks/useModalStore";
import { addGroup } from "@/backend/mutations/chat/add-group";

export const AddGroupSchema = z.object({
  title: z.string(),
});

export function AddGroupForm() {
  const [isPending, startTransition] = useTransition();
  const { onClose } = useModal();

  const form = useForm<z.infer<typeof AddGroupSchema>>({
    resolver: zodResolver(AddGroupSchema),
  });

  const onSubmit = (data: z.infer<typeof AddGroupSchema>) => {
    startTransition(() => {
      addGroup(data)
        .then(() => {
          toast.success("Group added !");
          onClose();
        })
        .catch(() => toast.error("Something went wrong ."));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4 text-white">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Title"
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
          disabled={isPending}
          size={"lg"}
          className="w-full rounded-full">
          Add new group
        </Button>
      </form>
    </Form>
  );
}
