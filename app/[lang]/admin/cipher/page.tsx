import { currentUser } from "@/lib/auth";
import axios from "axios";

async function CipherPage() {
  const user = await currentUser();
  const response = await axios.post(
    "https://dev.vdocipher.com/api/videos/a4f54920821f451cbf0363067c4cfc34/otp",
    {
      ttl: 300,
      annotate: JSON.stringify([
        {
          type: "rtext",
          text: user?.studentNumber,
          alpha: "0.60",
          color: "1FB4AB",
          size: "15",
          interval: "5000",
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

  return (
    <div>
      <iframe
        src={`https://player.vdocipher.com/v2/?otp=${response.data.otp}&playbackInfo=${response.data.playbackInfo}`}
        style={{ border: 0, height: "360px", width: "640px", maxWidth: "100%" }}
        allowFullScreen={true}
        allow="encrypted-media"></iframe>
    </div>
  );
}

export default CipherPage;
