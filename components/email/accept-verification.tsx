import Image from "next/image";

interface Props {
  name: string;
  link: string;
}

export default function AcceptVerification({ name, link }: Props) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "30px 20px",
        backgroundColor: "#121212",
        color: "#aaaaaa",
        lineHeight: 1.5,
      }}>
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <img
          src="https://gz4kd9hgc7.ufs.sh/f/30IwCQGCsURXdajqwB6OlWuRqkam0VpbNPTGtXrM7vJAzLsS"
          alt="Easy Money University Logo"
          style={{ width: "200px", height: "auto" }}
        />
      </div>
      {/* Email Content */}
      <div style={{ padding: "0 15px" }}>
        <p style={{ color: "#aaaaaa", fontSize: "16px", margin: "15px 0" }}>
          Hi {name},
        </p>

        <p
          style={{
            color: "#aaaaaa",
            fontSize: "18px",
            margin: "20px 0",
            fontWeight: "bold",
          }}>
          Great news — your verification has been approved! 🎉
        </p>

        <p
          style={{
            color: "#aaaaaa",
            fontSize: "16px",
            margin: "20px 0",
            lineHeight: "1.6",
          }}>
          You now have full access to your account and all the features
          available on Easy Money University.
        </p>

        <p
          style={{
            color: "#aaaaaa",
            fontSize: "16px",
            margin: "20px 0",
            lineHeight: "1.6",
          }}>
          We&apos;re excited to have you on board and can&apos;t wait to support
          your learning journey.
        </p>

        {/* Start Your Grinding Button */}
        <div style={{ margin: "30px 0" }}>
          <a
            href={link}
            style={{
              backgroundColor: "#1AB5A8",
              color: "white",
              padding: "14px 20px",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "16px",
              display: "block",
              textAlign: "center",
              fontWeight: "bold",
            }}>
            Start Your Grinding
          </a>
        </div>

        {/* Support Message */}
        <p
          style={{
            color: "#aaaaaa",
            fontSize: "14px",
            margin: "25px 0",
            lineHeight: "1.6",
          }}>
          If you have any questions or need help, don&apos;t hesitate to reach
          out to our support team.
        </p>

        {/* Closing */}
        <p style={{ color: "#aaaaaa", fontSize: "14px", margin: "25px 0 5px" }}>
          Welcome aboard,
        </p>

        <p style={{ color: "#aaaaaa", fontSize: "14px", margin: "5px 0 30px" }}>
          The Easy Money University Team
        </p>
      </div>

      {/* Social Media Links */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <a
          href="https://t.me/EasymoneySupport2"
          style={{
            display: "inline-block",
            margin: "0 10px",
            textDecoration: "none",
          }}>
          <img
            src="https://gz4kd9hgc7.ufs.sh/f/30IwCQGCsURX4YaokCD6Fw9szdcJR7ZVifGbhvnoS1u8Pg42"
            alt="Telegram"
            style={{
              width: "24px",
              height: "24px",
              filter: "brightness(0) invert(0.7)",
            }}
          />
        </a>
        <a
          href="https://www.instagram.com"
          style={{
            display: "inline-block",
            margin: "0 10px",
            textDecoration: "none",
          }}>
          <img
            src="https://gz4kd9hgc7.ufs.sh/f/30IwCQGCsURXuHhifIALSYDHA7Cq1peXTixKPOtlIrvgdUFw"
            alt="Instagram"
            style={{
              width: "24px",
              height: "24px",
              filter: "brightness(0) invert(0.7)",
            }}
          />
        </a>

        <p style={{ color: "#666666", fontSize: "12px", marginTop: "15px" }}>
          <a
            href="http://www.Easymoneyuniversity.com"
            style={{ color: "#666666", textDecoration: "underline" }}>
            www.Easymoneyuniversity.com
          </a>
        </p>
      </div>
    </div>
  );
}
