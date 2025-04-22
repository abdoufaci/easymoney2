"use server";

import { AddCourseSchema } from "@/components/forms/add-course-form";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { deleteFiles } from "../delete-file";

export const updateCourse = async (
  data: Partial<{
    englishTitle: string;
    arabicTitle: string;
    englishDesc: string;
    arabicDesc: string;
    videos: {
      englishTitle: string;
      arabicTitle: string;
      videoId: string;
      id: string;
    }[];
  }>,
  courseId: string,
  videosToDelete: {
    englishTitle: string;
    arabicTitle: string;
    videoId: string;
    id: string;
  }[],
  isActive: boolean,
  imageToDelete: {
    url: string;
    key: string;
  } | null
) => {
  const videosToAdd = data.videos
    ?.filter((item: any) => item.id === "")
    .map((item) => ({ ...item, courseId }));
  const videosToUpdate = data.videos
    ?.filter((item: any) => item.id !== "")
    .map((item) => ({ ...item, courseId }));

  if (data.videos) {
    delete data.videos;
  }

  if (imageToDelete) {
    await deleteFiles([imageToDelete]);
  }

  await db.course.update({
    where: {
      id: courseId,
    },
    //@ts-ignore
    data: {
      ...data,
      isActive,
    },
  });

  if (!!videosToAdd?.length) {
    const data = videosToAdd.map((video) => ({
      courseId: video.courseId,
      englishTitle: video.englishTitle,
      arabicTitle: video.arabicTitle,
      videoId: video.videoId,
    }));
    await db.video.createMany({
      data,
    });
  }

  if (!!videosToUpdate?.length) {
    videosToUpdate.map(async (video) => {
      await db.video.updateMany({
        where: {
          id: video.id,
        },
        data: {
          arabicTitle: video.arabicTitle,
          englishTitle: video.englishTitle,
          videoId: video.videoId,
        },
      });
    });
  }

  if (!!videosToDelete.length) {
    await db.video.deleteMany({
      where: {
        id: {
          in: videosToDelete.map((item) => item.id),
        },
      },
    });
  }

  revalidatePath("/");
};
