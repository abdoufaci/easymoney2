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
import EverythingUploader from "../everything-uploader";
import { addTestimony } from "@/backend/mutations/testimony/add-testimony";

export const AddTestimonySchema = z.object({
  video: z.object({
    id: z.string(),
    type: z.string(),
  }),
});

export function AddTestimonyForm() {
  const [isPending, startTransition] = useTransition();
  const { onClose, type, data } = useModal();

  const { groupId } = data;

  const form = useForm<z.infer<typeof AddTestimonySchema>>({
    resolver: zodResolver(AddTestimonySchema),
  });

  const onSubmit = (data: z.infer<typeof AddTestimonySchema>) => {
    startTransition(() => {
      addTestimony({ data, groupId })
        .then(() => {
          toast.success("Testimony added !");
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
            name="video"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-3 w-full relative">
                    <EverythingUploader
                      value={form.watch("video")}
                      onChange={field.onChange}
                      setImageToDelete={() => {}}
                      accept="video/*"
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
          Add the Testimony
        </Button>
      </form>
    </Form>
  );
}
