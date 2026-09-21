import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");
    const receiver = process.env.CONTACT_RECEIVER || gmailUser;

    if (!gmailUser || !gmailPass) {
      console.error("GMAIL_USER or GMAIL_APP_PASSWORD environment variables are missing in .env");
      return NextResponse.json(
        {
          success: false,
          message: "সার্ভারে ইমেইল কনফিগারেশন সেট করা নেই (GMAIL_USER বা GMAIL_APP_PASSWORD নেই)।",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    await transporter.sendMail({
      from: gmailUser,
      to: receiver,
      replyTo: email,
      subject: `[মনন পাঠক বার্তা] ${name || "বেনামী পাঠক"}-এর গল্প ও অভিজ্ঞতা`,
      text: `
নাম: ${name || "অজ্ঞাত/ছদ্মনাম"}
ইমেইল: ${email}

বার্তার বিবরণ:
${message}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Nodemailer error:", error);

    const err = error as { code?: string; responseCode?: number; message?: string };
    let userFriendlyMsg = "বার্তা পাঠানো সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।";
    if (err?.code === "EAUTH" || err?.responseCode === 535) {
      userFriendlyMsg = "জিমেইল প্রমাণীকরণ ব্যর্থ হয়েছে (Invalid App Password)। অনুগ্রহ করে সঠিক App Password প্রদান করুন।";
    }

    return NextResponse.json(
      {
        success: false,
        message: userFriendlyMsg,
        errorDetail: err?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}