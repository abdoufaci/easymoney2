import Image from "next/image";

interface Props {
  link: string;
}

export default function ResetPasswordEmail({ link }: Props) {
  return (
    <div>
      <style>
        {`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;500;600;700;900&display=swap');

      .montserrat {
        font-family: 'Montserrat', Arial, sans-serif; /* Fallback font */
      }
    `}
      </style>

      <table
        style={{
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto",
          border: "1px solid #ddd",
          textAlign: "center",
          fontSize: "14px",
          fontFamily: "sans-serif",
          lineHeight: "1.6",
          color: "#646768",
          borderRadius: "9px",
        }}>
        <tbody>
          <tr>
            <td
              style={{
                paddingBottom: "16px",
                paddingTop: "16px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <img
                src="https://utfs.io/f/O2ZQkQVBNWYXsFobQLicR8Lq461rSIQ2y379egb0hEZHkFwV"
                width="212"
                height="88"
                alt="Algeria-discovery"
                style={{
                  margin: "0 auto",
                  objectFit: "contain",
                }}
              />
            </td>
          </tr>
          <tr>
            <td
              style={{
                color: "#232323",
                fontWeight: "bold",
                fontSize: "20px",
                paddingBottom: "16px",
                fontFamily: "sans-serif",
              }}>
              Réinitialiser le mot de passe
            </td>
          </tr>
          <tr>
            <td
              style={{
                textAlign: "left",
                paddingRight: "32px",
                paddingLeft: "32px",
                fontFamily: "sans-serif",
              }}>
              <p style={{ margin: "0 0 16px 0", textAlign: "center" }}>
                Nous avons reçu une demande de changement de mot de <br /> passe
                sur Algérie Discovery
              </p>
              <a
                href={link}
                style={{
                  display: "inline-block",
                  width: "100%",
                  textAlign: "center",
                  padding: "8px",
                  fontSize: "17px",
                  color: "white",
                  background: "linear-gradient(to right, #DDBEA3, #C29A77)",
                  borderRadius: "8px",
                  fontFamily: "sans-serif",
                  textDecoration: "none",
                  fontWeight: "lighter",
                }}>
                Réinitialiser le mot de passe
              </a>
            </td>
          </tr>
          <tr>
            <td
              style={{
                fontSize: "12px",
                color: "#a7abaf",
                paddingTop: "16px",
                paddingBottom: "16px",
              }}>
              <tr>
                <td
                  style={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 45% 0 45%",
                  }}>
                  <a
                    target="_blank"
                    href="https://utfs.io/f/O2ZQkQVBNWYXJhXyBynM4bQCyFvoKh71Bk6gIaripSNsAXHq">
                    <img
                      src="https://utfs.io/f/O2ZQkQVBNWYXJhXyBynM4bQCyFvoKh71Bk6gIaripSNsAXHq"
                      width="20"
                      height="20"
                      alt="facebook"
                      style={{
                        objectFit: "contain",
                        marginRight: "20px",
                      }}
                    />
                  </a>
                  <a
                    target="_blank"
                    href="https://utfs.io/f/O2ZQkQVBNWYX4YJWNG6i0GR9Ir7BsoXJYDUxQp4f31t6euaC">
                    <img
                      src="https://utfs.io/f/O2ZQkQVBNWYX4YJWNG6i0GR9Ir7BsoXJYDUxQp4f31t6euaC"
                      width="20"
                      height="20"
                      alt="instagram"
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </a>
                </td>
              </tr>
              <p
                style={{
                  fontFamily: "sans-serif",
                }}>
                algeria.discovery.dz@gmail.com
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
