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
import { addSection } from "@/backend/mutations/section/add-section";
import { toast } from "sonner";
import { useModal } from "@/hooks/useModalStore";
import { MessageFileUpload } from "../message-file-upload";
import { addFileMessage } from "@/backend/mutations/chat/add-file-message";

export const AddMessageFileSchema = z.object({
  files: z.array(
    z.object({
      url: z.string(),
      key: z.string(),
      type: z.string(),
      size: z.string(),
      name: z.string(),
    })
  ),
});

export function AddMessageFileForm() {
  const [isPending, startTransition] = useTransition();
  const { onClose, data, type } = useModal();

  const isChat = type === "addChatFileMessage";

  const { groupId } = data;

  const form = useForm<z.infer<typeof AddMessageFileSchema>>({
    resolver: zodResolver(AddMessageFileSchema),
  });

  const onSubmit = (data: z.infer<typeof AddMessageFileSchema>) => {
    startTransition(() => {
      addFileMessage({ data, groupId: groupId || "", isChat })
        .then(() => {
          onClose();
          toast.success("Files added successfully");
          toast.dismiss();
        })
        .catch(() => toast.error("Failed to add files"));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4 text-white">
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-3 w-full relative">
                    <MessageFileUpload
                      //@ts-ignore
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </div>
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
          Add files
        </Button>
      </form>
    </Form>
  );
}
