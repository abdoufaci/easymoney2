"use server";

import { currentUser } from "@/lib/auth";
import axios from "axios";

export const getVideoById = async (videoId: string) => {
  if (!videoId) {
    return {
      otp: "",
      playbackInfo: "",
    };
  }

  const user = await currentUser();
  const response = await axios.post(
    `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
    {
      ttl: 300,
      annotate: JSON.stringify([
        {
          type: "rtext",
          text: user?.studentNumber,
          alpha: "0.60",
          color: "ffffff",
          size: "4",
          interval: "15000",
        },
      ]),
    },
    {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Apisecret ${process.env.CIPHER_KEY_SECRET}`,
      },
    }
  );

  return {
    otp: response.data.otp,
    playbackInfo: response.data.playbackInfo,
  };
};
