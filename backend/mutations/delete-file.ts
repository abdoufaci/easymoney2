"use server";

import { utapi } from "@/app/api/uploadthing/utapi";

export const deleteFiles = async (
  filesIds: {
    url: string;
    key: string;
  }[]
) => {
  const convertedData = filesIds.map((file) => file.key);

  try {
    await utapi.deleteFiles(convertedData);
    return convertedData;
  } catch (error) {
    console.log(error);
  }
};
