"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { CommentWithUserAndRepliesAndReactors } from "@/types/types";
import { ChevronDown, ChevronUp, Ellipsis, Heart, Loader2 } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { Button } from "@/components/ui/button";
import CommentHeader from "./comment-header";
import { useEffect, useState, useTransition } from "react";
import { getCommentReplies } from "@/backend/queries/comment/get-comment-replies";
import { toast } from "sonner";
import { updateCommentReaction } from "@/backend/mutations/comments/update-comment-reaction";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteComment } from "@/backend/mutations/comments/delete-comment";

interface Props {
  comment: CommentWithUserAndRepliesAndReactors;
  onClickReply: (commentId: string) => void;
  showReplyHeader: (commentId: string) => boolean;
  onReply: () => void;
  isReply?: boolean;
  RefetchReplies: (commentId: string) => void;
  onDeleteComment?: () => void;
}

function CommentCard({
  comment,
  onClickReply,
  showReplyHeader,
  onReply,
  isReply,
  onDeleteComment,
}: Props) {
  const currentUser = useCurrentUser();
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<
    CommentWithUserAndRepliesAndReactors[]
  >([]);
  const [isPending, startTransition] = useTransition();
  const [reactionPending, startReactionTrasition] = useTransition();
  const [deletePending, startDeleteTrasition] = useTransition();
  const [isReacted, setIsReacted] = useState<boolean>(
    !!comment.reactors.some((reactor) => reactor.id === currentUser?.id)
  );
  const [numberOfReactors, setNumberOfReactors] = useState<number>(
    comment.reactors.length
  );

  const result = formatDistanceToNowStrict(comment.createdAt, {
    addSuffix: false,
  }); // "14 hours"

  const shortResult = result
    .replace(" hours", "h")
    .replace(" hour", "h")
    .replace(" minutes", "m")
    .replace(" minute", "m")
    .replace(" seconds", "s")
    .replace(" second", "s")
    .replace(" days", "d")
    .replace(" day", "d");

  useEffect(() => {
    if (comment) {
      setIsReacted(
        !!comment.reactors.some((reactor) => reactor.id === currentUser?.id)
      );
      setNumberOfReactors(comment.reactors.length);
    }
  }, [comment]);

  const getReplies = async (commentId: string) => {
    startTransition(() => {
      getCommentReplies(commentId)
        .then((data) => {
          console.log("Replies fetched:", {
            data,
          });
          setReplies(data);
        })
        .catch(() => toast.error("Failed to load replies"));
    });
  };

  const handleReaction = async (reactionType: "like" | "dislike") => {
    setIsReacted(reactionType === "like");
    setNumberOfReactors((prev) =>
      reactionType === "like" ? prev + 1 : prev - 1
    );
    startReactionTrasition(() => {
      updateCommentReaction({ commentId: comment.id, reactionType }).catch(
        () => {
          toast.error("Failed to update reaction");
          setIsReacted(!isReacted);
          setNumberOfReactors((prev) =>
            reactionType === "like" ? prev - 1 : prev + 1
          );
        }
      );
    });
  };

  const handleDeleteComment = async () => {
    startDeleteTrasition(() => {
      deleteComment(comment.id)
        .then(() => {
          toast.success("Comment deleted");
          if (isReply) {
            onDeleteComment?.();
          }
        })
        .catch(() => {
          toast.error("Failed to delete comment");
        });
    });
  };

  return (
    <div
      className={cn("w-full flex items-start justify-between flex-wrap gap-5")}>
      <div className="flex items-start gap-4 w-full">
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
        <div className="space-y-4 flex flex-col items-start w-full">
          <div className="space-y-2 flex flex-col items-start w-full group">
            <div className="flex items-center gap-4">
              <h1 className="font-semibold">{comment.user.name}</h1>
              <h3 className="text-[#BCBCBC] text-xs">{shortResult} ago</h3>
              {(currentUser?.id === comment.userId ||
                currentUser?.role === "ADMIN") && (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis className="text-white h-5 w-5 cursor-pointer hidden group-hover:block" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      disabled={deletePending}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleDeleteComment();
                      }}
                      className="bg-[#FF00000F] text-[#FF0000] hover:!text-[#FF0000] hover:!bg-[#FF00000F] focus-within:bg-[#FF00000F] cursor-pointer">
                      <h1>Delete</h1>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <p className="whitespace-break-spaces text-white text-sm">
              {comment?.comment}
            </p>
            <div className="flex items-center gap-5">
              <Button
                disabled={reactionPending || deletePending}
                onClick={() => handleReaction(isReacted ? "dislike" : "like")}
                variant={"white_link"}
                className="flex items-center gap-2 p-0 h-fit">
                <Heart
                  className={cn(
                    "h-4 w-4 cursor-pointer",
                    isReacted ? "text-red-500 fill-red-500" : "text-white"
                  )}
                />
                <h1 className="text-xs font-medium text-[#848484]">
                  {numberOfReactors > 1000
                    ? `${Math.floor(numberOfReactors / 100)} K`
                    : numberOfReactors}
                </h1>
              </Button>
              <Button
                onClick={() => !deletePending && onClickReply(comment.id)}
                variant={"white_reply"}
                className="p-0 h-fit">
                Reply
              </Button>
            </div>

            {!deletePending && showReplyHeader(comment.id) && (
              <CommentHeader
                videoId={comment.videoId}
                commentId={comment.id}
                onReply={onReply}
                RefetchReplies={() => {
                  getReplies(comment.id);
                  setShowReplies(true);
                }}
              />
            )}
            {comment?._count.replies > 0 && (
              <Button
                disabled={isPending}
                onClick={() => {
                  setShowReplies(!showReplies);
                  if (!showReplies && replies.length === 0) {
                    getReplies(comment.id);
                  }
                }}
                variant={"brand_link"}
                className="flex items-center gap-3">
                {showReplies ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                <h1>Replies ({comment._count.replies})</h1>
              </Button>
            )}
          </div>
          {showReplies && (
            <>
              {isPending && !replies.length ? (
                <div className="w-full h-20 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 text-brand animate-spin" />
                </div>
              ) : (
                <div className="flex flex-col gap-3 w-full">
                  {replies.map((reply) => (
                    <CommentCard
                      key={reply.id}
                      comment={reply}
                      onClickReply={(replyId) => onClickReply(replyId)}
                      showReplyHeader={(replyId) => showReplyHeader(replyId)}
                      onReply={onReply}
                      RefetchReplies={() => getReplies(reply.id)}
                      isReply
                      onDeleteComment={() =>
                        setReplies((prev) =>
                          prev.filter((r) => r.id !== reply.id)
                        )
                      }
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
