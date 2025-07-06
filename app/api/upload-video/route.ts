import { NextResponse } from "next/server";
import { Readable } from "stream";
import Busboy from "busboy";
import fs from "fs";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

// Helper to convert web Request to Node.js stream
function requestToStream(req: Request): Readable {
  const reader = req.body?.getReader();
  return new Readable({
    async read() {
      if (!reader) return this.push(null);
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        this.push(value);
      }
      this.push(null);
    },
  });
}

export async function POST(req: Request): Promise<Response> {
  return new Promise<Response>((resolve) => {
    const busboy = Busboy({
      headers: Object.fromEntries(req.headers),
    });

    const uploadedFiles: {
      tempPath: string;
      type: string;
    }[] = [];

    busboy.on("file", (fieldname, file, { filename, mimeType }) => {
      if (!filename || !mimeType) return;

      const extension = path.extname(filename);
      const uniqueName = `${uuidv4()}${extension}`;
      const tempPath = path.join(os.tmpdir(), uniqueName);

      uploadedFiles.push({
        tempPath,
        type: mimeType.split("/")[0],
      });

      const writeStream = fs.createWriteStream(tempPath);
      file.pipe(writeStream);
    });

    busboy.on("finish", async () => {
      if (uploadedFiles.length === 0) {
        return resolve(
          NextResponse.json(
            { message: "No video files uploaded." },
            { status: 400 }
          )
        );
      }

      const uploadedVideos = [];

      try {
        for (let i = 0; i < uploadedFiles.length; i++) {
          const { tempPath, type } = uploadedFiles[i];
          const fileStream = fs.createReadStream(tempPath);

          // Step 1: Create video object in Bunny Stream
          const createVideoRes = await axios.post(
            `https://video.bunnycdn.com/library/${process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID}/videos`,
            { title: "easymoney video" },
            {
              headers: {
                AccessKey: process.env.BUNNY_STREAM_API_KEY!,
                "Content-Type": "application/json",
              },
            }
          );

          const videoId = createVideoRes.data.guid;

          // Step 2: Upload video file
          await axios.put(
            `https://video.bunnycdn.com/library/${process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID}/videos/${videoId}`,
            fileStream,
            {
              headers: {
                AccessKey: process.env.BUNNY_STREAM_API_KEY!,
                "Content-Type": "application/octet-stream",
              },
              maxContentLength: Infinity,
              maxBodyLength: Infinity,
            }
          );

          fs.unlink(tempPath, (err) => {
            if (err) console.error("Cleanup failed:", err);
          });

          const embedUrl = `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID}/${videoId}`;

          uploadedVideos.push({
            id: videoId,
            type,
          });
        }

        resolve(
          NextResponse.json(
            {
              files: uploadedVideos,
            },
            { status: 200 }
          )
        );
      } catch (err: any) {
        console.error(
          "Error uploading one of the videos:",
          err.response?.data || err.message
        );
        resolve(
          NextResponse.json(
            {
              message: "Failed during multi-upload.",
              error: err.response?.data || err.message,
            },
            { status: 500 }
          )
        );
      }
    });

    requestToStream(req).pipe(busboy);
  });
}
