import { NextResponse } from "next/server";
import { Readable } from "stream";
import Busboy from "busboy";
import fs from "fs";
import path from "path";
import os from "os";
import { zone, file as File } from "@bunny.net/storage-sdk";
import { v4 } from "uuid";

// Convert Request to Node.js stream
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
  return new Promise<Response>((resolve, reject) => {
    const busboy = Busboy({
      headers: Object.fromEntries(req.headers),
    });

    const uploadedFiles: {
      id: string;
      type: string;
    }[] = [];

    const tempFiles: {
      path: string;
      id: string;
      type: string;
      name: string;
    }[] = [];

    busboy.on("file", (fieldname, file, { filename, mimeType }) => {
      if (!filename || typeof filename !== "string" || !mimeType) return;

      const extension = path.extname(filename);
      const id = `${v4()}${extension}`;
      const tempPath = path.join(os.tmpdir(), id);

      file.on("end", () => {
        tempFiles.push({
          path: tempPath,
          name: filename,
          id,
          type: mimeType.split("/")[0],
        });
      });

      const writeStream = fs.createWriteStream(tempPath);
      file.pipe(writeStream);
    });

    busboy.on("finish", async () => {
      try {
        const storage = zone.connect_with_accesskey(
          // @ts-ignore
          "de",
          process.env.BUNNY_STORAGE_ZONE_NAME!,
          process.env.BUNNY_STORAGE_API_KEY!
        );

        for (const { path: tempPath, id, type } of tempFiles) {
          const uploadPath = `/${id}`;
          const stream = fs.createReadStream(tempPath);

          // @ts-ignore
          await File.upload(storage, uploadPath, stream);

          fs.unlinkSync(tempPath);

          uploadedFiles.push({
            id,
            type,
          });
        }

        resolve(NextResponse.json({ files: uploadedFiles }, { status: 200 }));
      } catch (err: any) {
        console.error("Upload error:", err);
        resolve(
          NextResponse.json(
            { message: "Upload failed", error: err.message },
            { status: 500 }
          )
        );
      }
    });

    requestToStream(req).pipe(busboy);
  });
}
