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
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useModal } from "@/hooks/useModalStore";
import { AvatarImageUpload } from "../avatar-upload";
import { Minus, Plus } from "lucide-react";
import { addCourse } from "@/backend/mutations/courses/add-course";
import { getChangedValues } from "@/lib/values-to-change";
import { updateCourse } from "@/backend/mutations/courses/update-course";

export const AddCourseSchema = z.object({
  image: z.object({
    key: z.string(),
    url: z.string(),
  }),
  englishTitle: z.string(),
  arabicTitle: z.string(),
  englishDesc: z.string(),
  arabicDesc: z.string(),
  priceInEuro: z.string(),
  priceInDa: z.string(),
  videos: z.array(
    z.object({
      englishTitle: z.string(),
      arabicTitle: z.string(),
      videoId: z.string(),
      id: z.string(),
    })
  ),
});

interface Props {
  isActive: boolean;
}

export function AddCourseForm({ isActive }: Props) {
  const [isPending, startTransition] = useTransition();
  const { onClose, data, type } = useModal();
  const [videosToDelete, setVideosToDelete] = useState<
    { englishTitle: string; arabicTitle: string; videoId: string; id: string }[]
  >([]);
  const [imageToDelete, setImageToDelete] = useState<{
    url: string;
    key: string;
  } | null>(null);

  const { section, course } = data;

  const form = useForm<z.infer<typeof AddCourseSchema>>({
    resolver: zodResolver(AddCourseSchema),
    defaultValues: {
      videos:
        type === "editCourse"
          ? course?.videos.map((video) => ({
              arabicTitle: video.arabicTitle,
              englishTitle: video.englishTitle,
              videoId: video.videoId,
              id: video.id,
            }))
          : [
              {
                arabicTitle: "",
                englishTitle: "",
                videoId: "",
                id: "",
              },
            ],
      arabicDesc: course?.arabicDesc,
      arabicTitle: course?.arabicTitle,
      englishDesc: course?.englishDesc,
      englishTitle: course?.englishTitle,
      image: course?.image as {},
      priceInDa: course?.priceInDa,
      priceInEuro: course?.priceInEuro,
    },
  });

  const onSubmit = (data: z.infer<typeof AddCourseSchema>) => {
    if (type === "editCourse") {
      const defaultValues = form.formState.defaultValues as z.infer<
        typeof AddCourseSchema
      >;
      let dataToUpdate = getChangedValues(data, defaultValues);

      const videos = dataToUpdate.videos?.filter((item, idx) =>
        idx > defaultValues.videos.length - 1
          ? true
          : item.arabicTitle != defaultValues.videos[idx].arabicTitle ||
            item.englishTitle != defaultValues.videos[idx].englishTitle ||
            item.videoId != defaultValues.videos[idx].videoId
      );
      dataToUpdate.videos = videos;
      if (!dataToUpdate.videos?.length) {
        delete dataToUpdate.videos;
      }

      // console.log({
      //   dataToUpdate,
      //   videosToDelete,
      // });

      startTransition(() => {
        updateCourse(
          dataToUpdate,
          course?.id || "",
          videosToDelete,
          isActive,
          imageToDelete
        )
          .then(() => {
            toast.success("Course updated !");
            onClose();
          })
          .catch(() => toast.error("Something went wrong ."));
      });
    }
    if (type === "addCourse") {
      startTransition(() => {
        addCourse(data, section?.id || "")
          .then(() => {
            toast.success("Course added !");
            onClose();
          })
          .catch(() => toast.error("Something went wrong ."));
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:!grid-cols-2 gap-5">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-3 w-full relative">
                      <AvatarImageUpload
                        //@ts-ignore
                        value={field.value}
                        onChange={field.onChange}
                        endpoint="imageUploader"
                        setImageToDelete={setImageToDelete}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="englishTitle"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="English Title"
                      className="border-white border-[0.54px] text-white placeholder:text-white py-6 pl-5 rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="englishDesc"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="English Description"
                      className="border-white border-[0.54px] text-white placeholder:text-white py-6 pl-5 rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="arabicTitle"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Arabic Title"
                      className="border-white border-[0.54px] text-white placeholder:text-white py-6 pl-5 rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="arabicDesc"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Arabic Description"
                      className="border-white border-[0.54px] text-white placeholder:text-white py-6 pl-5 rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priceInEuro"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="number"
                      placeholder="Price $"
                      className="border-white border-[0.54px] text-white placeholder:text-white py-6 pl-5 rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priceInDa"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="number"
                      placeholder="Price DA"
                      className="border-white border-[0.54px] text-white placeholder:text-white py-6 pl-5 rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="videos"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-6">
                    <div className="space-y-5">
                      {field.value.map((video, idx) => (
                        <div key={idx} className="space-y-4">
                          <div className="flex items-center gap-5">
                            <h1>Video {idx + 1}</h1>
                            {idx > 0 && (
                              <Button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setVideosToDelete((prev) => [...prev, video]);
                                  field.onChange(
                                    field.value.filter(
                                      (_, item_idx) => idx != item_idx
                                    )
                                  );
                                }}
                                variant={"delete"}
                                className="rounded-full h-5 w-5 p-0 flex items-center justify-center bg-[#FF000029] border-none">
                                <Minus className="h-1 w-1" />
                              </Button>
                            )}
                          </div>
                          <div className="space-y-3">
                            <Input
                              value={video.englishTitle}
                              onChange={(e) => {
                                field.value[idx].englishTitle = e.target.value;
                                field.onChange(field.value);
                              }}
                              disabled={isPending}
                              placeholder="English Title"
                              className="border-white border-[0.54px] text-white placeholder:text-white py-6 pl-5 rounded-full"
                            />
                            <Input
                              value={video.arabicTitle}
                              onChange={(e) => {
                                field.value[idx].arabicTitle = e.target.value;
                                field.onChange(field.value);
                              }}
                              disabled={isPending}
                              placeholder="Arabic Title"
                              className="border-white border-[0.54px] text-white placeholder:text-white py-6 pl-5 rounded-full"
                            />
                            <Input
                              value={video.videoId}
                              onChange={(e) => {
                                field.value[idx].videoId = e.target.value;
                                field.onChange(field.value);
                              }}
                              disabled={isPending}
                              placeholder="Video ID"
                              className="border-white border-[0.54px] text-white placeholder:text-white py-6 pl-5 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        field.onChange([
                          ...field.value,
                          {
                            englishTitle: "",
                            arabicTitle: "",
                            videoId: "",
                            id: "",
                          },
                        ]);
                      }}
                      size={"lg"}
                      variant={"addSection"}
                      className="rounded-full">
                      <Plus className="h-4 w-4" />
                      Add New Video
                    </Button>
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
          {type === "editCourse" ? "Save changes" : "Add the Section"}
        </Button>
      </form>
    </Form>
  );
}
