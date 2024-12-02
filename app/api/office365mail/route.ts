import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  const transporter = nodemailer.createTransport({
    host: process.env.MS356_EMAIL_SERVER_HOST as string,
    port: parseInt(process.env.MS356_EMAIL_SERVER_PORT as string, 10),
    secure: false, // Use TLS or false
    auth: {
      user: process.env.MS356_EMAIL_SERVER_USER as string,
      pass: process.env.MS356_EMAIL_SERVER_PASSWORD as string,
    },
  });

  const to = "wayne@fitchef.co.za";
  const subject = "Testing from Recipee";
  const text = "Hi Wayne are you getting this";
  const html = "<strong>Hi Wayne are you getting this</strong>";

  const mailOptions = {
    from: process.env.EMAIL_FROM as string,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
    return NextResponse.json({
      message: "Email sent",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Error sending email: ", error);
    return NextResponse.json(
      { message: "Error sending email", error: (error as Error).message },
      { status: 500 }
    );
  }
}
