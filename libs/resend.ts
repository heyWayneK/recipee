import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.group("⚠️ RESEND_API_KEY missing from .env");
  console.error("It's not mandatory but it's required to send emails.");
  console.error("If you don't need it, remove the code from /libs/resend.ts");
  console.groupEnd();
}

/**
 * Sends an email using the provided parameters.
 *
 * @async
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} html - The HTML content of the email.
 * @returns {Promise} A Promise that resolves when the email is sent.
 */

export const sendEmail = async ({ subject, html, replyTo }: { from: string; subject: string; text: string; html: string; replyTo: string }): Promise<any> => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const email_libs = await resend.emails.send({
    from: process.env.SEND_EMAIL_FROM!,
    subject,
    to: replyTo,
    html,
  });

  console.log("email_libs", email_libs);
};
