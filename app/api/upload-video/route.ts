// app/api/get-bunny-upload-info/route.ts
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import path from "path"; // Import path for path.extname
import { StorageRegion } from "@bunny.net/storage-sdk"; // Import StorageRegion

async function generateSHA256(video_id: string, expiry: number) {
  const data =
    process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID! +
    process.env.BUNNY_STREAM_API_KEY! +
    expiry +
    video_id;
  const encoder = new TextEncoder();
  const encoded = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export async function POST(req: Request) {
  try {
    const { fileName, fileType } = await req.json(); // Client sends desired filename and type

    if (!fileName || !fileType) {
      return NextResponse.json(
        { message: "fileName and fileType are required." },
        { status: 400 }
      );
    }

    const storageZoneName = process.env.BUNNY_STORAGE_ZONE_NAME;
    const storageApiKey = process.env.BUNNY_STORAGE_API_KEY; // Your Storage Zone FTP & API Password
    const streamLibraryId = process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID;
    const streamApiKey = process.env.BUNNY_STREAM_API_KEY;
    const bunnyCdnHostname = process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME; // e.g., easymoney.b-cdn.net

    if (
      !storageZoneName ||
      !storageApiKey ||
      !streamLibraryId ||
      !streamApiKey ||
      !bunnyCdnHostname
    ) {
      return NextResponse.json(
        { message: "Bunny.net credentials not fully configured on server." },
        { status: 500 }
      );
    }

    const fileExtension = path.extname(fileName);
    const uniqueFileName = `${uuidv4()}${fileExtension}`;

    let uploadInfo;

    // For video, we first create a video object in Bunny Stream
    // This step still goes through your Vercel function, but it's a small payload.
    const createVideoResponse = await fetch(
      `https://video.bunnycdn.com/library/${streamLibraryId}/videos`,
      {
        method: "POST",
        headers: {
          AccessKey: streamApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: fileName }),
      }
    );

    if (!createVideoResponse.ok) {
      const errorData = await createVideoResponse.json();
      throw new Error(
        `Failed to create Bunny Stream video object: ${
          errorData.Message || createVideoResponse.statusText
        }`
      );
    }

    const videoData = await createVideoResponse.json();
    const videoId = videoData.guid;

    const expiry = Math.floor(Date.now() / 1000) + 60 * 60;

    // Provide TUS-specific upload information
    uploadInfo = {
      type: "video",
      // The TUS endpoint for Bunny Stream
      tusUploadUrl: `https://video.bunnycdn.com/tusupload`,
      // Headers required by TUS for Bunny Stream
      headers: {
        AuthorizationSignature: await generateSHA256(videoId, expiry), // SHA256 signature (library_id + api_key + expiration_time + video_id)
        AuthorizationExpire: expiry, // Expiration time as in the signature,
        VideoId: videoId, // The guid of a previously created video object through the Create Video API call
        LibraryId: streamLibraryId,
      },
      metadata: {
        filetype: fileType,
        title: "My video",
      },
      publicUrl: `https://iframe.mediadelivery.net/embed/${streamLibraryId}/${videoId}`, // Embed URL
      videoId: videoId,
    };

    return NextResponse.json({ success: true, uploadInfo }, { status: 200 });
  } catch (error: any) {
    console.error("Error generating Bunny.net upload info:", error.message);
    return NextResponse.json(
      { message: "Failed to get upload info", error: error.message },
      { status: 500 }
    );
  }
}
