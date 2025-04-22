"use server";

import { AddCourseSchema } from "@/components/forms/add-course-form";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addCourse = async (
  data: z.infer<typeof AddCourseSchema>,
  sectionId: string
) => {
  await db.section.update({
    where: {
      id: sectionId,
    },
    data: {
      courses: {
        create: {
          arabicDesc: data.arabicDesc,
          arabicTitle: data.arabicTitle,
          priceInDa: data.priceInDa,
          priceInEuro: data.priceInEuro,
          englishDesc: data.englishDesc,
          englishTitle: data.englishTitle,
          image: data.image,
          videos: {
            createMany: {
              data: data.videos.map((video) => ({
                englishTitle: video.englishTitle,
                arabicTitle: video.arabicTitle,
                videoId: video.videoId,
              })),
            },
          },
        },
      },
    },
  });

  revalidatePath("/");
};
