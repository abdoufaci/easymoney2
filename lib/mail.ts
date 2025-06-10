import AcceptVerification from "@/components/email/accept-verification";
import EmailVerification from "@/components/email/email-verification";
import RejectVerification from "@/components/email/reject-verification";
import ResetPasswordEmail from "@/components/email/reset-password-email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  console.log({
    code: token,
  });

  await resend.emails.send({
    from: "easymoney_university@easy-money-university.com",
    to: [email],
    subject: "2FA Code",
    html: `<p>Click <a href="${token}">here</a> to reset password.</p>`,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  name: string
) => {
  const resetLink = `${process.env.NEXT_PUBLIC_HOME_URL}auth/new-password?token=${token}`;

  console.log({
    resetLink,
  });
  await resend.emails.send({
    from: "easymoney_university@easy-money-university.com",
    to: [email],
    subject: "reset your password",
    // html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
    react: ResetPasswordEmail({ link: resetLink, name }),
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string
) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_HOME_URL}auth/new-verification?token=${token}`;

  console.log({
    confirmLink,
  });
  await resend.emails.send({
    from: "easymoney_university@easy-money-university.com",
    to: [email],
    subject: "Confirm your email",
    react: EmailVerification({ link: confirmLink, name }),
  });
};

export const sendRejectVerification = async (email: string, name: string) => {
  const link = `${process.env.NEXT_PUBLIC_HOME_URL}dashboard/settings`;

  await resend.emails.send({
    from: "easymoney_university@easy-money-university.com",
    to: [email],
    subject: "Verification Request Rejected",
    react: RejectVerification({ name, link }),
  });
};

export const sendAcceptVerification = async (email: string, name: string) => {
  const link = `${process.env.NEXT_PUBLIC_HOME_URL}dashboard`;

  await resend.emails.send({
    from: "easymoney_university@easy-money-university.com",
    to: [email],
    subject: "Verification Request Accepted",
    react: AcceptVerification({ name, link }),
  });
};
