import { currentUser } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const user = await currentUser();

  if (!user) throw new Error("Unauthorized");
  return { userId: user.id };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  logoUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(() => handleAuth())
    // This code runs on your server before upload
    .onUploadComplete(() => {}),
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 20 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(() => handleAuth())
    // This code runs on your server before upload
    .onUploadComplete(() => {}),
  labelFile: f(["pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  // This code RUNS ON YOUR SERVER after upload
  fileMessageUploader: f({
    image: { maxFileSize: "2MB", maxFileCount: 4 },
    video: { maxFileSize: "256MB", maxFileCount: 1 },
    audio: { maxFileSize: "2MB", maxFileCount: 1 },
    pdf: { maxFileSize: "2MB", maxFileCount: 1 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(() => handleAuth())
    // This code runs on your server before upload
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
