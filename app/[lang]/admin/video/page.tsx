import jwt from "jsonwebtoken";
import Player from "./_components/player";

function VideoPage() {
  const secretKey = Buffer.from(
    process.env.MUX_SIGNING_KEY_SECRET!,
    "base64"
  ).toString("ascii");
  const token = jwt.sign(
    {
      sub: "CYzbq902WjrWLkQUp8xcXLyFFW4GLiTVQFWE01alPlJJE",
      aud: "v",
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
      kid: process.env.MUX_SIGNING_KEY_ID,
    },
    secretKey,
    { algorithm: "RS256" }
  );
  return <Player token={token} />;
}

export default VideoPage;
