"use client";

import { addComment } from "@/backend/mutations/comments/add-comment";
import { addCommentReply } from "@/backend/mutations/comments/add-comment-reply";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Comment, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const AddCommentformSchema = z.object({
  comment: z.string(),
});

interface Props {
  commentId?: string;
  videoId: string;
  onReply: () => void;
  RefetchReplies: () => void;
}

function CommentHeader({ commentId, videoId, onReply, RefetchReplies }: Props) {
  const currentUser = useCurrentUser();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AddCommentformSchema>>({
    resolver: zodResolver(AddCommentformSchema),
    defaultValues: {
      comment: "",
    },
  });

  const {
    formState: { isDirty },
  } = form;

  const comment = form.watch("comment");

  async function onSubmit(data: z.infer<typeof AddCommentformSchema>) {
    if (!isDirty) {
      return;
    }
    startTransition(() => {
      if (commentId) {
        addCommentReply({
          data,
          commentId,
          videoId,
        })
          .then(() => {
            form.reset();
            onReply();
            RefetchReplies();
            toast.success("Reply added successfully!");
          })
          .catch(() => toast.error("Something went wrong!"));
      }
      if (!commentId) {
        addComment({
          data,
          videoId,
        })
          .then(() => {
            form.reset();
            toast.success("Comment added successfully!");
          })
          .catch(() => toast.error("Something went wrong!"));
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={
          "h-[84px] rounded-t-[12.94px] flex items-center gap-3 w-full"
        }>
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={
              currentUser?.image?.id
                ? `https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME}/${currentUser.image.id}`
                : currentUser?.image || ""
            }
            className="object-cover"
          />
          <AvatarFallback className="bg-brand/10 cursor-pointer">
            {currentUser?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="w-full flex items-center">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full text-white">
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="text"
                    {...field}
                    placeholder="Write a comment..."
                    className="w-full h-[46px] bg-[#C4CDDB2E] !rounded-l-[9px] !rounded-r-[0px] border-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="h-[46px] flex items-center justify-center px-2 bg-[#C4CDDB2E] hover:bg-[#C4CDDB2E] rounded-none rounded-r-[9px]">
            <SendHorizontal
              className={cn(
                "h-4 w-4 ",
                comment != "" ? "text-brand" : "text-[#95A1B1]"
              )}
            />
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CommentHeader;
