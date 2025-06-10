"use client";

import { addMessage } from "@/backend/mutations/chat/add-message";
import { EmojiPicker } from "@/components/chat/emoji-picker";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useModal } from "@/hooks/useModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mic, Paperclip, SendHorizontal, Smile, Trash } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { z } from "zod";
import { uploadFiles } from "@/utils/uploadthing";
import { addVoiceMessage } from "@/backend/mutations/chat/add-voice-message";

export const ChatInputFormSchema = z.object({
  message: z.string(),
});

interface Props {
  groupId: string;
  isChat?: boolean;
}

function ChatInput({ groupId, isChat = false }: Props) {
  const { onOpen } = useModal();
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [uploadAudio, setUploadAudio] = useState(false);
  const {
    startRecording,
    stopRecording,
    recordingBlob,
    isRecording,
    recordingTime,
  } = useAudioRecorder();

  const form = useForm<z.infer<typeof ChatInputFormSchema>>({
    resolver: zodResolver(ChatInputFormSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit({ message }: z.infer<typeof ChatInputFormSchema>) {
    if (!message || message.trim() === "") {
      return;
    }
    startTransition(async () => {
      addMessage({ data: { message }, groupId, isChat })
        .then(() => {
          form.reset();
        })
        .catch((error) => toast.error("Failed to send message"));
    });
  }

  const addAudioElement = async () => {
    setUploadAudio(true);
    stopRecording();
  };

  useEffect(() => {
    if (recordingBlob && uploadAudio == true) {
      setUploadAudio(false);
      const uploadAudioFunction = async () => {
        const files = [new File([recordingBlob], "test.webm")];
        const res = await uploadFiles("fileMessageUploader", {
          files,
        });

        console.log("Audio uploaded:", res);
        startTransition(async () => {
          addVoiceMessage({
            file: {
              url: res[0].ufsUrl,
              key: res[0].key,
            },
            groupId,
            isChat,
          })
            .then(() => {
              form.reset();
            })
            .catch((error) => toast.error("Failed to send message"));
        });
      };

      uploadAudioFunction();
    }
  }, [recordingBlob]);

  return (
    <div className="p-5 border-t h-[88.8px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3">
                  {/* Message Input */}
                  <div className="flex-1 relative">
                    <Input
                      disabled={isPending}
                      type="text"
                      placeholder="Write your message ..."
                      className="bg-[#FFFFFF14] rounded-full pr-32 h-12 text-sm pl-5 inputBg"
                      {...field}
                    />

                    {/* Input Icons */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      {isRecording ? (
                        <div className="flex items-center gap-x-2">
                          <div className="pb-[1px]">{recordingTime}</div>
                          <div className="rounded-full w-4 h-4 bg-red-400 animate-pulse" />
                        </div>
                      ) : (
                        <>
                          <Button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              startRecording();
                            }}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-transparent">
                            <Mic className="h-4 w-4" />
                          </Button>

                          <EmojiPicker
                            onChange={(emoji: string) =>
                              field.onChange(`${field.value} ${emoji}`)
                            }
                          />

                          <Button
                            type="button"
                            onClick={() =>
                              onOpen(
                                isChat
                                  ? "addChatFileMessage"
                                  : "addFileMessage",
                                { groupId, user }
                              )
                            }
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-transparent">
                            <Paperclip className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Send Button */}
                  {isRecording ? (
                    <>
                      <div className="bg-gray-800 text-rose-500 rounded-full w-[40px] h-[40px] p-[8px]">
                        <Trash role="button" onClick={stopRecording} />
                      </div>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addAudioElement();
                        }}
                        disabled={isPending}
                        className="h-12 w-12 rounded-full bg-[#1FB4AB]/90 hover:bg-[#1FB4AB] p-0 transition-all duration-100 ease-out text-white">
                        <SendHorizontal className="h-5 w-5" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isPending || !field.value.trim()}
                      className="h-12 w-12 rounded-full bg-[#1FB4AB]/90 hover:bg-[#1FB4AB] p-0 transition-all duration-100 ease-out text-white">
                      <SendHorizontal className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

export default ChatInput;
