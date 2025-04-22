import Image from "next/image";

interface Props {
  link: string;
  name: string;
}

export default function ResetPasswordEmail({ link, name }: Props) {
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
          Welcome to Easy Money University!
        </p>

        <p
          style={{
            color: "#aaaaaa",
            fontSize: "16px",
            margin: "20px 0",
            lineHeight: "1.6",
          }}>
          We received a request to reset your password for your Easy Money
          University account.
        </p>

        <p
          style={{
            color: "#aaaaaa",
            fontSize: "16px",
            margin: "20px 0",
            lineHeight: "1.6",
          }}>
          If you made this request, click the button below to create a new
          password:
        </p>

        {/* Verify Email Button */}
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
            Reset My Password
          </a>
        </div>

        {/* Closing */}
        <p
          style={{ color: "#aaaaaa", fontSize: "16px", margin: "30px 0 10px" }}>
          Thank you,
        </p>

        <p
          style={{ color: "#aaaaaa", fontSize: "16px", margin: "10px 0 40px" }}>
          Easy Money University Team
        </p>
      </div>

      {/* Social Media Links */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <a
          href="#"
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
          href="/"
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
